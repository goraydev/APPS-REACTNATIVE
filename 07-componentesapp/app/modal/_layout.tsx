import { Stack } from "expo-router";
import React from "react";

export default function ModalLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="modal-window"
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="modal-window2"
        options={{
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
