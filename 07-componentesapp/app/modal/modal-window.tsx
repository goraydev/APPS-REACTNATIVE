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
      bgColor="#A52120"
    >
      <ThemedText>Soy un modal</ThemedText>
      <ThemedButton
        onPress={() => router.push("/modal/modal-window2")}
        className="dark:bg-gray-800"
      >
        Otro Modal
      </ThemedButton>
      <ThemedButton onPress={() => router.back()}>Volver atrás</ThemedButton>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </ThemedView>
  );
}
