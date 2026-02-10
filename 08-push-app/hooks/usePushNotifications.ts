import { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { router, useRootNavigationState } from 'expo-router';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

interface SendPushOptions {
  to: string[];
  title: string;
  body: string;
  data?: Record<string, any>;
}

async function sendPushNotification({ to, title, body, data }: SendPushOptions) {
  const message = {
    to,
    sound: 'default',
    title,
    body,
    data,
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      //aviso al usuario que va a recibir el prompt
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError('Permission not granted to get push token for push notification!');
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError('Project ID not found');
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log({ [Platform.OS]: pushTokenString });
      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError('Must use physical device for push notifications');
  }
}

export const usePushNotifications = () => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notifications, setNotifications] = useState<Notifications.Notification[]>([]);
  const [pendingNotification, setPendingNotification] = useState<string | null>('');
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    function redirect(notification: Notifications.Notification) {
      const url = notification.request.content.data?.url;
      if (typeof url === 'string') {
        router.push(url as any);
      }
    }

    const response = Notifications.getLastNotificationResponse();
    if (response?.notification) {
      redirect(response.notification);
    }

    const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
      redirect(response.notification);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    const checkInitialNotification = async () => {
      const response = await Notifications.getLastNotificationResponse();

      if (response?.notification?.request?.content?.data?.chatId) {
        const { chatId } = response.notification.request.content.data;

        router.push(`/chat/${chatId}`);
      }
    };
    checkInitialNotification();
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token ?? ''))
      .catch((error: any) => setExpoPushToken(`${error}`));
  }, []);

  useEffect(() => {
    const notificationListener = Notifications.addNotificationReceivedListener((notification) => {
      setNotifications((prevNotifications) => [notification, ...prevNotifications]);
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response.notification.request.content);
      const chatId = response.notification.request.content.data?.chatId;

      if (typeof chatId === 'string' && chatId.length > 0) {
        setPendingNotification(chatId);
      }

      /* if (chatId) {
        router.push(`/chat/${chatId}`);
      } */
    });

    //Implementar la funcion cuando la app esta culminada o cerrada
    const handleInitialNotification = () => {
      const response = Notifications.getLastNotificationResponse();
      const chatId = response?.notification?.request?.content?.data?.chatId;
      if (typeof chatId === 'string' && chatId.length > 0) {
        setPendingNotification(chatId);
      }
    };
    handleInitialNotification();

    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

  useEffect(() => {
    if (!rootNavigationState.key) return;
    if (!pendingNotification) return;

    router.push(`/chat/${pendingNotification}`);
    setPendingNotification(null);
  }, [pendingNotification, rootNavigationState?.key]);

  return {
    //props
    expoPushToken,
    notifications,

    //methods
    sendPushNotification,
  };
};
