import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function App() {
  const safeArea = useSafeAreaInsets();

  return (
    <View
      style={{ flex: 1, marginTop: safeArea.top, marginHorizontal: "auto" }}
    >
      <Text>App</Text>
      <StatusBar style="dark" />
    </View>
  );
}
