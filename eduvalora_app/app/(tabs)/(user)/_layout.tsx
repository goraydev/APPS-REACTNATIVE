import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

export default function StackUserLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="/tabs/(user)/validatestudent" />
      <Stack.Screen name="/tabs/(user)/signin" />
      <Stack.Screen name="/tabs/(user)/signup" />
      <Stack.Screen name="/tabs/(user)/settings" />
    </Stack>
  );
}
