import ThemedChange from "@/presentation/theme/components/ThemedChange";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SystemUI from "expo-system-ui";
import { Platform } from "react-native";
import "react-native-reanimated";
import "../global.css";

const isAndroid = Platform.OS === "android";
if (isAndroid) {
  SystemUI.setBackgroundColorAsync("transparent");
}

export default function RootLayout() {
  const [loaded] = useFonts({
    "kanit-bold": require("../assets/fonts/Kanit-Bold.ttf"),
    "kanit-regular": require("../assets/fonts/Kanit-Regular.ttf"),
    "kanit-thin": require("../assets/fonts/Kanit-Thin.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <ThemedChange>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="/home" />
      </Stack>
    </ThemedChange>
  );
}
