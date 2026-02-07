import { Colors } from "@/constants/Colors";
import { allRoutes } from "@/constants/Routes";
import { useThemeColor } from "@/hooks/use-theme-color";
import { ThemeChangerProvider } from "@/presentation/context/ThemeChangeContext";
import { Stack } from "expo-router";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import "../global.css";

export default function RootLayout() {
  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    "background",
  );

  useEffect(() => {
    SystemUI.setBackgroundColorAsync("transparent");
  }, []);

  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: backgroundColor }}
    >
      <ThemeChangerProvider>
        {/*     <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}> */}
        <Stack>
          <Stack.Screen name="index" />
          {allRoutes.map((route) => (
            <Stack.Screen
              name={route.name}
              key={route.name}
              options={{
                title: route.title,
              }}
            />
          ))}
        </Stack>
        {/* </ThemeProvider> */}
      </ThemeChangerProvider>
    </GestureHandlerRootView>
  );
}
