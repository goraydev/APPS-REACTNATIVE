import { useThemeChangerContext } from "@/presentation/context/ThemeChangeContext";
import ThemedCard from "@/presentation/shared/ThemedCard";
import ThemedSwitch from "@/presentation/shared/ThemedSwitch";
import ThemedText from "@/presentation/shared/ThemedText";
import ThemedView from "@/presentation/shared/ThemedView";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";

const ThemesScreen = () => {
  const { toggleTheme, currentTheme, setSystemTheme, isSystemTheme } =
    useThemeChangerContext();

  const { colorScheme, setColorScheme, toggleColorScheme } = useColorScheme();
  const [textSwitch, setTextSwitch] = useState("");
  const [stateMode, setStateMode] = useState(currentTheme === "dark");
  const [systemMode, setSystemMode] = useState(isSystemTheme);

  const onChangeTheme = () => {
    /* if (stateMode) {
      setColorScheme("light");
      return setTextSwitch("Light Mode");
    }
    setColorScheme("dark");
    setTextSwitch("Dark Mode"); */
  };

  const setDarkMode = (value: boolean) => {
    toggleTheme();
    setStateMode(value);
    setSystemMode(false);
  };

  const onChangeSystemMode = (value: boolean) => {
    if (value) {
      setSystemTheme();
    }
    setSystemMode(value);
  };

  useEffect(() => {
    if (colorScheme === "light") {
      return setTextSwitch("Light Mode");
    }

    setTextSwitch("Dark Mode");
  }, [colorScheme]);

  return (
    <ThemedView padding>
      <ThemedCard>
        <ThemedSwitch
          text={textSwitch}
          value={stateMode}
          onValueChange={setDarkMode}
        />
      </ThemedCard>
      <ThemedCard className="mt-4">
        <ThemedSwitch
          text="Color del sistema"
          value={systemMode}
          onValueChange={onChangeSystemMode}
        />
      </ThemedCard>
      <ThemedText>Soy de Color según Native {colorScheme}</ThemedText>
    </ThemedView>
  );
};
export default ThemesScreen;
