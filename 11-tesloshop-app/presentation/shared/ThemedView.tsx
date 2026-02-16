import React from "react";
import { ScrollView, View } from "react-native";

interface Props {
  className?: string;
  children: React.ReactNode;
  scroll?: boolean;
  padding?: boolean;
}
export default function ThemedView({
  className,
  children,
  scroll = false,
  padding = false,
}: Props) {
  const paddingClass = padding ? "px-4" : "";

  return scroll ? (
    <ScrollView
      className={`flex-1 bg-white dark:bg-gray-900 ${paddingClass}`}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View className={`flex-1 bg-white dark:bg-gray-900 ${paddingClass}`}>
      {children}
    </View>
  );
}
