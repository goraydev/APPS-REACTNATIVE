import React from "react";
import { View, ViewProps } from "react-native";

interface Props extends ViewProps {
  className?: string;
}

export default function ThemedCard({ className, children, ...rest }: Props) {
  return (
    <View
      className={`bg-gray-200 dark:bg-black  rounded-xl p-2 shadow-black/5 ${className}`}
      {...rest}
    >
      {children}
    </View>
  );
}
