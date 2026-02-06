import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "nativewind";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

interface ThemeChangerContextType {
  currentTheme: "light" | "dark";
  isSystemTheme: boolean;
  toggleTheme: () => void;
  setSystemTheme: () => void;
}

const ThemeChangerContext = createContext({} as ThemeChangerContextType);

//Custome hoork para acceder al ThemeChangerContext
export const useThemeChangerContext = () => {
  const themeChanger = useContext(ThemeChangerContext);

  return themeChanger;
};

//provider

export const ThemeChangerProvider = ({ children }: PropsWithChildren) => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [isDarkMode, setisDarkMode] = useState(colorScheme === "dark");
  const [isSystemThemeEnabled, setisSystemThemeEnabled] = useState(true);

  const currentTheme = isSystemThemeEnabled
    ? colorScheme
    : isDarkMode
      ? "dark"
      : "light";

  useEffect(() => {
    AsyncStorage.getItem("select-theme").then((theme) => {
      if (!theme) return;

      setisDarkMode(theme === "dark");
      setisSystemThemeEnabled(theme === "system");
      setColorScheme(theme as "light" | "dark" | "system");
    });
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <ThemeChangerContext.Provider
        value={{
          currentTheme: currentTheme ?? "light",
          isSystemTheme: isSystemThemeEnabled,
          toggleTheme: async () => {
            setisDarkMode(!isDarkMode);
            setColorScheme(isDarkMode ? "light" : "dark");
            setisSystemThemeEnabled(false);
            await AsyncStorage.setItem(
              "select-theme",
              isDarkMode ? "light" : "dark",
            );
          },
          setSystemTheme: async () => {
            setisSystemThemeEnabled(true);
            setColorScheme("system");
            await AsyncStorage.setItem("select-theme", "system");
          },
        }}
      >
        {children}
      </ThemeChangerContext.Provider>
    </ThemeProvider>
  );
};
