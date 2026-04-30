import React from 'react';
import { Stack } from 'expo-router';

export default function StackLayout() {
  return (
    <Stack>
      <Stack.Screen name="home/index" options={{ headerShown: false }} />
      <Stack.Screen name="teacher/[id]/index" />
      <Stack.Screen name="calification/[idcalification]/index" />
    </Stack>
  );
}
  