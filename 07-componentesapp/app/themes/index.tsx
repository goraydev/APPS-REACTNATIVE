import ThemedCard from "@/presentation/shared/ThemedCard";
import ThemedSwitch from "@/presentation/shared/ThemedSwitch";
import ThemedText from "@/presentation/shared/ThemedText";
import ThemedView from "@/presentation/shared/ThemedView";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";

const ThemesScreen = () => {
  const [textSwitch, setTextSwitch] = useState("");
  const [stateMode, setStateMode] = useState(false);
  const [themeSystem, setThemeSystem] = useState(false);
  const { colorScheme, setColorScheme, toggleColorScheme } = useColorScheme();

  const onChangeTheme = () => {
    /* if (stateMode) {
      setColorScheme("light");
      return setTextSwitch("Light Mode");
    }
    setColorScheme("dark");
    setTextSwitch("Dark Mode"); */
  };

  useEffect(() => {
    if (colorScheme === "light") {
      setStateMode(false);
      return setTextSwitch("Light Mode");
    }
    setStateMode(true);
    setTextSwitch("Dark Mode");
  }, [colorScheme]);

  return (
    <ThemedView padding>
      <ThemedCard>
        <ThemedSwitch
          text={textSwitch}
          value={stateMode}
          onValueChange={toggleColorScheme}
        />
      </ThemedCard>
      <ThemedCard className="mt-4">
        <ThemedSwitch
          text="Color del sistema"
          value={themeSystem}
          onValueChange={(value) => {
            setThemeSystem(value);
          }}
        />
      </ThemedCard>
      <ThemedText>Soy de Color según Native {colorScheme}</ThemedText>
    </ThemedView>
  );
};
export default ThemesScreen;
