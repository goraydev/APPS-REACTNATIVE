import PermissionCheckedProvider from "@/presentation/providers/PermissionCheckedProvider";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <PermissionCheckedProvider>
        <Stack>
          <Stack.Screen name="loading/index" />
          <Stack.Screen
            name="map/index"
            options={{
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="permisisions/index"
            options={{
              animation: "fade",
              gestureEnabled: false,
            }}
          />
        </Stack>
      </PermissionCheckedProvider>
    </ThemeProvider>
  );
}
