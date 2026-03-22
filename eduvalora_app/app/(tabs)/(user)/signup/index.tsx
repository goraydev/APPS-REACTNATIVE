import { View, Text, useWindowDimensions } from 'react-native';
import React from 'react';
import ThemedHeader from '@/presentation/shared/ThemedHeader';
import ThemedView from '@/presentation/shared/ThemedView';
import ThemedText from '@/presentation/shared/ThemedText';

export default function SignUpScreen() {
  const { height } = useWindowDimensions();
  return (
    <>
      <ThemedHeader title="Validar estudiante" />
      <ThemedView padding>
        <View className="mt-4">
          <View style={{ paddingTop: height * 0.2 }} />
          <ThemedText>SignUp</ThemedText>
        </View>
      </ThemedView>
    </>
  );
}
