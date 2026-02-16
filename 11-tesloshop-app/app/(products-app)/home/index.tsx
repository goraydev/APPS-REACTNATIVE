import ThemedText from "@/presentation/shared/ThemedText";
import ThemedView from "@/presentation/shared/ThemedView";
import React from "react";

export default function HomeScreen() {
  return (
    <ThemedView padding>
      <ThemedText type="h1" className="font-kanit-bold">
        Holaa
      </ThemedText>
    </ThemedView>
  );
}
