import { useFocusEffect } from "expo-router";
import React, { useCallback } from "react";
import { BackHandler, Text, View } from "react-native";

export default function MapScreen() {
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        return true; // Prevenir retroceso
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress,
      );

      return () => subscription.remove();
    }, []),
  );
  return (
    <View>
      <Text>MapScreen</Text>
    </View>
  );
}
