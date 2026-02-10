import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import '../global.css';
import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';
import { usePushNotifications } from '@/hooks/usePushNotifications';

export default function Layout() {
  const { colorScheme, setColorScheme } = useColorScheme();
  usePushNotifications();

  useEffect(() => {
    setColorScheme('system');
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'Inicio',
          }}
        />
        <Stack.Screen name="/profile" />
      </Stack>
    </ThemeProvider>
  );
}
