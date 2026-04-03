import React from 'react';
import ThemedView from '@/presentation/shared/ThemedView';
import ThemedText from '@/presentation/shared/ThemedText';
import { useLocalSearchParams } from 'expo-router';

export default function TeacherScreen() {
  const { id } = useLocalSearchParams();
  console.log(id);

  return (
    <>
      <ThemedView padding>
        <ThemedText>TeacherScreen</ThemedText>
      </ThemedView>
    </>
  );
}
