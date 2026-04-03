import React, { useEffect, useState } from 'react';
import ThemedHeader from '@/presentation/shared/ThemedHeader';
import ThemedView from '@/presentation/shared/ThemedView';
import ThemedSwitch from '@/presentation/theme/components/ThemedSwitch';
import ThemedText from '@/presentation/shared/ThemedText';
import { useAuthStore } from '@/presentation/auth/store/store';
import ThemedButton from '@/presentation/shared/ThemedButton';
import { View } from 'react-native';
import { Link } from 'expo-router';
import ThemedActivity from '@/presentation/shared/ThemedActivity';

export default function SettingsScreen() {
  const { user, logout } = useAuthStore();

  return (
    <>
      <ThemedHeader title={`Hola ${user?.username}`} />
      <ThemedView scroll padding>
        <ThemedText type="h2" className="my-4">
          Ajustes de Tema
        </ThemedText>
        <ThemedSwitch />
        <ThemedText type="h2" className="my-4">
          Ajustes de Perfil
        </ThemedText>

        <View className="flex flex-col gap-4">
          <Link href="/settings/profile" className="rounded-md bg-gray-300 p-4 dark:bg-gray-950">
            <ThemedText>Actualizar Datos Generales</ThemedText>
          </Link>

          <Link href="/settings/photo" className="rounded-md bg-gray-300 p-4 dark:bg-gray-950">
            <ThemedText>Actualizar Foto de Perfil</ThemedText>
          </Link>
          <Link href="/settings/password" className="rounded-md bg-gray-300 p-4 dark:bg-gray-950">
            <ThemedText>Actualizar Contraseña</ThemedText>
          </Link>
        </View>
        <View className="mt-4" />
        <ThemedButton text="Cerrar Sesión" onPress={logout} icon="log-out-outline" />
      </ThemedView>
    </>
  );
}
