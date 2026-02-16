import { useThemeStore } from "@/store/useThemeStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "nativewind";
import { PropsWithChildren, useEffect } from "react";
import { View } from "react-native";

export default function ThemedChange({ children }: PropsWithChildren) {
  const { colorScheme, setColorScheme } = useColorScheme();
  const { toggleTheme } = useThemeStore();

  useEffect(() => {
    AsyncStorage.getItem("select-theme").then((theme) => {
      if (!theme) return;
      setColorScheme(theme as "dark" | "light" | "system");
      toggleTheme(theme as "dark" | "light" | "system");
    });
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <View className="flex-1 bg-gray-200 dark:bg-gray-900">{children}</View>
    </ThemeProvider>
  );
}
