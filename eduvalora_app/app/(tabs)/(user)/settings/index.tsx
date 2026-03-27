import React, { useState } from 'react';
import ThemedHeader from '@/presentation/shared/ThemedHeader';
import ThemedView from '@/presentation/shared/ThemedView';
import ThemedSwitch from '@/presentation/theme/components/ThemedSwitch';
import ThemedText from '@/presentation/shared/ThemedText';
import { useAuthStore } from '@/presentation/auth/store/store';
import ThemedButton from '@/presentation/shared/ThemedButton';
import { View } from 'react-native';
import ThemedTextInput from '@/presentation/shared/ThemedTextInput';
import ThemedActivity from '@/presentation/shared/ThemedActivity';

export default function SettingsScreen() {
  const { logout, user } = useAuthStore();
  const [boxUserName, setBoxUsername] = useState('');
  const [boxEmail, setboxEmail] = useState();

  if (!user) {
    return <ThemedActivity />;
  }
  const { username, email } = user.usuario;

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
        <View className="flex flex-col gap-4">
          <ThemedText type="semibold">Nombre de Usuario: </ThemedText>
          <ThemedTextInput
            value={username}
            onChangeText={(text) => setBoxUsername(text)}
            placeholder="Username"
          />
        </View>
        <View className="my-4 flex flex-col gap-4">
          <ThemedText type="semibold">Email: </ThemedText>
          <ThemedTextInput
            value={email}
            onChangeText={(text) => setBoxUsername(text)}
            placeholder="Username"
          />
        </View>

        <ThemedButton text="Actualizar" onPress={logout} />
      </ThemedView>
    </>
  );
}
