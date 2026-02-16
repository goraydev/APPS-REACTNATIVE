import ThemedSwitch from "@/presentation/components/ThemedSwitch";
import ThemedText from "@/presentation/shared/ThemedText";
import { useThemeStore } from "@/store/useThemeStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import React, { useCallback } from "react";
import { Text, View } from "react-native";

export default function App() {
  const { toggleTheme, theme } = useThemeStore();
  const { setColorScheme } = useColorScheme();

  const setDarkMode = useCallback(
    async (value: boolean) => {
      const newTheme = value ? "dark" : "light";
      toggleTheme(newTheme);
      setColorScheme(newTheme);
      try {
        await AsyncStorage.setItem("select-theme", newTheme);
      } catch (e) {
        // Log error; avoid blocking UI
        // eslint-disable-next-line no-console
        console.error("Failed to save theme to storage", e);
      }
    },
    [toggleTheme, setColorScheme],
  );

  return (
    <>
      <Text className="text-2xl text-red-500 dark:text-green-500">App</Text>
      <View className="flex-row justify-between items-center mx-4 px-4 bg-gray-300 rounded-md dark:bg-gray-950">
        <ThemedText>Hola</ThemedText>
        <ThemedSwitch
          value={theme === "dark" ? true : false}
          onValueChange={setDarkMode}
        />
      </View>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
    </>
  );
}
