import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import '../global.css';
import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';
<<<<<<< HEAD
=======
import { useEffect } from 'react';
>>>>>>> parent of 9eb1a82 (Incluyendo eas a push notifications)

export default function Layout() {
  const { colorScheme, setColorScheme } = useColorScheme();

  

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
