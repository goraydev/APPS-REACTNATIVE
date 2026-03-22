import { View, useWindowDimensions } from 'react-native';
import React from 'react';
import ThemedHeader from '@/presentation/shared/ThemedHeader';
import ThemedView from '@/presentation/shared/ThemedView';
import ValidateStudent from '@/core/auth/components/ValidateStudent';

export default function ValidateStudentScreen() {
  const { height } = useWindowDimensions();
  return (
    <>
      <ThemedHeader title="Validar estudiante" />
      <ThemedView padding>
        <View className="mt-4">
          <View style={{ paddingTop: height * 0.2 }} />
          <ValidateStudent />
        </View>
      </ThemedView>
    </>
  );
}
