import React from 'react';
import ThemedHeader from '@/presentation/shared/ThemedHeader';
import ThemedView from '@/presentation/shared/ThemedView';
import ThemedSwitch from '@/presentation/theme/components/ThemedSwitch';
import ThemedText from '@/presentation/shared/ThemedText';

export default function SettingsScreen() {
  return (
    <>
      <ThemedHeader title="Ajustes" />
      <ThemedView scroll padding>
        <ThemedText type="h2" className="my-4">
          Ajustes de Tema
        </ThemedText>
        <ThemedSwitch />
        <ThemedText type="h2" className="my-4">
          Ajustes de Perfil
        </ThemedText>
      </ThemedView>
    </>
  );
}
