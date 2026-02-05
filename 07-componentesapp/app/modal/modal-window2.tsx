import ThemedButton from "@/presentation/shared/ThemedButton";
import ThemedText from "@/presentation/shared/ThemedText";
import ThemedView from "@/presentation/shared/ThemedView";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform } from "react-native";

export default function ModalWindow() {
  return (
    <ThemedView
      padding
      className="flex-1 items-center justify-center"
      bgColor="#A52182"
    >
      <ThemedText>Soy el modal 2</ThemedText>
      <ThemedButton onPress={() => router.back()}>Volver atrás</ThemedButton>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} hidden />
    </ThemedView>
  );
}
