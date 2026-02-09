import { View, Text, Pressable, FlatList } from 'react-native';
import React from 'react';
import { usePushNotifications } from '@/hooks/usePushNotifications';

export default function PushNotificacion() {
  const { expoPushToken, sendPushNotification, notifications } = usePushNotifications();

  return (
    <View className="flex-1 px-4">
      <View >
        <Text className="text-2xl dark:text-white">{expoPushToken}</Text>
      </View>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.request.identifier}
        renderItem={({ item }) => (
          <View className="px-4 py-10 bg-gray-900  rounded-md">
            <Text className="text-2xl text-white">{item.request.content.title}</Text>
            <Text className="text-white">{item.request.content.body}</Text>
            <Text className="text-white">{JSON.stringify(item.request.content.data, null, 2)}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View className="mt-2 opacity-50" />}
        ListEmptyComponent={() => (
          <View className="flex-1 items-center justify-center py-20">
            <Text className="dark:text-white">No tienes nada de notificaciones</Text>
          </View>
        )}
      />

      {/* <Pressable
        onPress={async () =>
          await sendPushNotification({
            body: 'Mandando notificacion',
            title: 'Notificacion Push',
            to: [expoPushToken],
            data: {
              chatId: 'ABC-123',
            },
          })
        }
        className="mt-2 rounded-md bg-green-500 p-4">
        <Text className="text-white">Notificacion</Text>
      </Pressable> */}
    </View>
  );
}
