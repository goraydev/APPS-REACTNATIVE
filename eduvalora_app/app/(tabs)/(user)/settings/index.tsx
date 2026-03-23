import React from 'react';
import ThemedHeader from '@/presentation/shared/ThemedHeader';
import ThemedView from '@/presentation/shared/ThemedView';
import ThemedSwitch from '@/presentation/theme/components/ThemedSwitch';
import ThemedText from '@/presentation/shared/ThemedText';
import { useAuthStore } from '@/presentation/auth/store/store';
import ThemedButton from '@/presentation/shared/ThemedButton';

export default function SettingsScreen() {
  const { logout, user } = useAuthStore();

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
        <ThemedText>Usuario: {user?.usuario.username}</ThemedText>
        <ThemedButton text="Cerrar Sesión" onPress={logout} icon="log-out-outline" />
      </ThemedView>
    </>
  );
}
