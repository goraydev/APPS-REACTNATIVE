import { View, Text } from 'react-native';
import React from 'react';
import ThemedText from '@/presentation/shared/ThemedText';
import ThemedView from '@/presentation/shared/ThemedView';

export default function HomeScreen() {
  return (
    <ThemedView padding>
      <ThemedText>HomeScreen</ThemedText>
    </ThemedView>
  );
}
