import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, PressableProps, Text } from "react-native";

interface Props extends PressableProps {
  text: string;
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
}

export default function ThemedButton({ text, onPress, icon, ...rest }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-blue-500 active:bg-blue-700 rounded-md p-4 flex-row items-center justify-center gap-2"
      {...rest}
    >
      <Text className="text-white font-kanit-regular">{text}</Text>
      <Ionicons name={icon} size={24} color="white" />
    </Pressable>
  );
}
