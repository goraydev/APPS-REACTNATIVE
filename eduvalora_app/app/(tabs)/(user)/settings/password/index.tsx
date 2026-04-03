import React from 'react';
import ThemedHeader from '@/presentation/shared/ThemedHeader';
import ThemedView from '@/presentation/shared/ThemedView';
import ThemedText from '@/presentation/shared/ThemedText';
import UpdatePassword from '@/presentation/auth/components/UpdatePassword';
import { useWindowDimensions, View } from 'react-native';

export default function PasswordScreen() {
  const { height } = useWindowDimensions();
  return (
    <>
      <ThemedHeader title="Eduvalora" />
      <ThemedView padding>
        <View style={{ paddingTop: height * 0.2 }} />
        <ThemedText type="h1" className="mb-4 text-center">
          Actualizar Contraseña
        </ThemedText>
        <UpdatePassword />
      </ThemedView>
    </>
  );
}
