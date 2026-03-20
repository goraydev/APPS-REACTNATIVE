import { View, Text } from 'react-native';
import React from 'react';
import ThemedView from '@/presentation/shared/ThemedView';
import ThemedText from '@/presentation/shared/ThemedText';
import ThemedHeader from '@/presentation/shared/ThemedHeader';
import ThemedSwitch from '@/presentation/theme/components/ThemedSwitch';

export default function UserScreen() {
  return (
    <>
      <ThemedHeader title="Usuario" />
      <ThemedView padding>
        <View className="mt-4">
          <ThemedSwitch />
          <ThemedText>Usuario sin iniciar sesión</ThemedText>
        </View>
      </ThemedView>
    </>
  );
}
