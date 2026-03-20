import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeStore } from '../theme/store/useThemeStore';
import ThemedText from './ThemedText';

interface Props {
  title: string;
}

export default function ThemedHeader({ title }: Props) {
  const areaSure = useSafeAreaInsets();
  const { theme } = useThemeStore();

  return (
    <View className="bg-gray-200 p-4 dark:bg-gray-950" style={{ marginTop: areaSure.top }}>
      <ThemedText className="text-center text-xl font-bold">{title}</ThemedText>
    </View>
  );
}
