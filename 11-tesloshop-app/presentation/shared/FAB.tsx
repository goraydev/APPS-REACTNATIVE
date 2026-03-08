import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable } from "react-native";
import { useThemeStore } from "../theme/store/useThemeStore";

interface Props {
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  className?: string;
}

export default function FAB({ icon, onPress, className }: Props) {
  const { theme } = useThemeStore();
  return (
    <Pressable
      className={`${className} absolute right-10 bottom-14 bg-blue-500 rounded-xl w-16 h-16 items-center justify-center`}
      onPress={onPress}
    >
      <Ionicons name={icon} size={30} color="white" />
    </Pressable>
  );
}
