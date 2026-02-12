import { usePermissionStore } from "@/presentation/store/usePermission";
import { useFocusEffect } from "expo-router";
import React, { useCallback } from "react";
import { BackHandler, Pressable, StyleSheet, Text, View } from "react-native";

export default function PermissionsScreen() {
  const { locationStatus, requestLocationPermission } = usePermissionStore();

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
    <View style={styles.container}>
      <Text style={{ fontSize: 18 }}>
        Permisos Screen, status: {locationStatus}
      </Text>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={requestLocationPermission}
      >
        <Text style={styles.textButton}>Otorgar Permisos de Ubicación</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#000000bc",
    padding: 10,
    borderRadius: 10,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  textButton: {
    color: "#fff",
    fontSize: 20,
  },
});
