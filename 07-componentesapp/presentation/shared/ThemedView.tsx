import { useThemeColor } from "@/hooks/use-theme-color";
import React from "react";
import { View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props extends ViewProps {
  className?: string;
  margin?: boolean;
  padding?: boolean;
  safe?: boolean;
  bgColor?: string;
}

export default function ThemedView({
  style,
  className,
  margin = false,
  padding = false,
  safe = false,
  bgColor,
  children,
}: Props) {
  const safeArea = useSafeAreaInsets();
  const backgroundColor = bgColor ?? useThemeColor({}, "background");

  return (
    <View
      style={[
        {
          backgroundColor: backgroundColor,
          paddingHorizontal: padding ? 10 : 0,
          paddingTop: safeArea.top,
          flex: 1,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
