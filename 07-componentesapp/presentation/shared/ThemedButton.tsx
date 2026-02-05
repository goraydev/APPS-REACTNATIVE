import React from "react";
import { Pressable, PressableProps } from "react-native";
import ThemedText from "./ThemedText";

interface Props extends PressableProps {
  onPress: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function ThemedButton({ onPress, children, className }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className={`bg-light-secondary dark:bg-dark-secondary p-4 rounded-md active:opacity-80 ${className}`}
    >
      <ThemedText type="h2" className="text-center">
        {children}
      </ThemedText>
    </Pressable>
  );
}
