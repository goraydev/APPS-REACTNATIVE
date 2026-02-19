import React from "react";
import { ActivityIndicator } from "react-native";
import { useThemeStore } from "../theme/store/useThemeStore";
import ThemedView from "./ThemedView";

export default function ThemedActivity() {
  const { theme } = useThemeStore();

  return (
    <ThemedView className="justify-center items-center">
      <ActivityIndicator
        size={30}
        color={theme === "dark" ? "white" : "black"}
        className="flex-1"
      />
    </ThemedView>
  );
}
