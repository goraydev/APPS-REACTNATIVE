import ThemedText from '@/presentation/shared/ThemedText';
import React, { useEffect, useState } from 'react';
import { Switch, View } from 'react-native';
import { useThemeStore } from '../store/useThemeStore';

export default function ThemedSwitch() {
  const { theme, toggleTheme } = useThemeStore();
  const [changeTheme, setChangeTheme] = useState(false);

  const setDarkMode = (value: boolean) => {
    setChangeTheme(value);
    toggleTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    setChangeTheme(theme === 'dark' ? true : false);
  }, [theme]);

  return (
    <View className="flex-row items-center justify-between rounded-md bg-gray-300 px-4 dark:bg-gray-950">
      <ThemedText>{changeTheme ? 'Dark Mode' : 'Light Mode'}</ThemedText>
      <Switch value={changeTheme} onValueChange={(value) => setDarkMode(value)} />
    </View>
  );
}
