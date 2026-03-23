import React from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';

interface Props {
  className?: string;
  children: React.ReactNode;
  scroll?: boolean;
  padding?: boolean;
  productQueryById?: any;
}
export default function ThemedView({
  className,
  children,
  scroll = false,
  padding = false,
}: Props) {
  const paddingClass = padding ? 'px-4' : '';

  return scroll ? (
    <ScrollView
      className={`flex-1 bg-white dark:bg-gray-900 ${paddingClass} ${className}`}
      showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  ) : (
    <View className={`flex-1 bg-white dark:bg-gray-900 ${paddingClass} ${className}`}>
      {children}
    </View>
  );
}
