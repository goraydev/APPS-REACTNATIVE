import React, { useState } from 'react';
import ThemedHeader from '@/presentation/shared/ThemedHeader';
import ThemedView from '@/presentation/shared/ThemedView';
import ThemedSwitch from '@/presentation/theme/components/ThemedSwitch';
import ThemedText from '@/presentation/shared/ThemedText';
import { useAuthStore } from '@/presentation/auth/store/store';
import ThemedButton from '@/presentation/shared/ThemedButton';
import { Alert, View } from 'react-native';
import ThemedTextInput from '@/presentation/shared/ThemedTextInput';
import ThemedActivity from '@/presentation/shared/ThemedActivity';
import useUpdateDatesUser from '@/presentation/auth/hooks/useUpdateDatesUser';

export default function SettingsScreen() {
  const { user } = useAuthStore();
  const { updateUserQuery } = useUpdateDatesUser();

  if (!user) {
    return <ThemedActivity />;
  }
  const { username, email, id } = user.usuario;

  const [boxUserName, setBoxUsername] = useState(username);
  const [boxEmail, setboxEmail] = useState(email);

  const handleSubmit = () => {
    if (boxUserName === '' || boxEmail === '') {
      Alert.alert('Error', 'Por favor, rellena todos los campos');
      return;
    }

    //console.log({ username, email, id });
    updateUserQuery({ username: boxUserName, email: boxEmail, idUser: id });
  };

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
            value={boxUserName}
            onChangeText={setBoxUsername}
            placeholder="Username"
          />
        </View>
        <View className="my-4 flex flex-col gap-4">
          <ThemedText type="semibold">Email: </ThemedText>
          <ThemedTextInput value={boxEmail} onChangeText={setboxEmail} placeholder="Username" />
        </View>

        <ThemedButton text="Actualizar" onPress={handleSubmit} />
      </ThemedView>
    </>
  );
}
