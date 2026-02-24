import ThemedHeader from "@/presentation/shared/ThemedHeader";
import ThemedText from "@/presentation/shared/ThemedText";
import ThemedView from "@/presentation/shared/ThemedView";
import ThemedSwitch from "@/presentation/theme/components/ThemedSwitch";
import React from "react";

export default function HomeScreen() {
  return (
    <>
      <ThemedHeader title="Productos" />
      <ThemedView padding>
        <ThemedText>Hola</ThemedText>
        <ThemedText>Hola</ThemedText>
        <ThemedSwitch />
      </ThemedView>
    </>
  );
}
