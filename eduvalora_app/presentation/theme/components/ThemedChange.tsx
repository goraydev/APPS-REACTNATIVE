import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from 'nativewind';
import { PropsWithChildren, useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useThemeStore } from '../store/useThemeStore';

export default function ThemedChange({ children }: PropsWithChildren) {
  const { colorScheme, setColorScheme } = useColorScheme();
  const { toggleTheme, theme } = useThemeStore();

  useEffect(() => {
    AsyncStorage.getItem('select-theme').then((theme) => {
      if (!theme) return;
      const themeValue = theme as 'dark' | 'light' | 'system';
      setColorScheme(themeValue);
      toggleTheme(themeValue);
    });
  }, []);

  useEffect(() => {
    setColorScheme(theme);
    AsyncStorage.setItem('select-theme', theme); // Guardar también
  }, [theme]);

  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: theme === 'dark' ? 'black' : 'white' }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {children}
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
