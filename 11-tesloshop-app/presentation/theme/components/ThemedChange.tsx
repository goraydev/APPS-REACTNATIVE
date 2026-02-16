import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "nativewind";
import { PropsWithChildren, useEffect } from "react";
import { useThemeStore } from "../store/useThemeStore";

export default function ThemedChange({ children }: PropsWithChildren) {
  const { colorScheme, setColorScheme } = useColorScheme();
  const { toggleTheme } = useThemeStore();

  useEffect(() => {
    console.log(colorScheme);
    AsyncStorage.getItem("select-theme").then((theme) => {
      if (!theme) return;
      setColorScheme(theme as "dark" | "light" | "system");
      toggleTheme(theme as "dark" | "light" | "system");
    });
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {children}
    </ThemeProvider>
  );
}
