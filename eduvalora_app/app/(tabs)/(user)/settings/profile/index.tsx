import React, { use, useEffect, useState } from 'react';
import ThemedHeader from '@/presentation/shared/ThemedHeader';
import ThemedText from '@/presentation/shared/ThemedText';
import ThemedView from '@/presentation/shared/ThemedView';
import { Alert, View } from 'react-native';
import ThemedTextInput from '@/presentation/shared/ThemedTextInput';
import ThemedButton from '@/presentation/shared/ThemedButton';
import { useAuthStore } from '@/presentation/auth/store/store';
import useUpdateDatesUser from '@/presentation/auth/hooks/useUpdateDatesUser';
import ThemedActivity from '@/presentation/shared/ThemedActivity';
import { useWindowDimensions } from 'react-native';

export default function ProfileScreen() {
  const { user, logout, status } = useAuthStore();
  const [boxUserName, setBoxUsername] = useState('');
  const [boxEmail, setboxEmail] = useState('');
  const { updateUserQuery } = useUpdateDatesUser();
  const { height } = useWindowDimensions();

  useEffect(() => {
    if (user) {
      setBoxUsername(user.username);
      setboxEmail(user.email);
    }
  }, [user]);

  if (!user) return <ThemedActivity />;

  const { username, id } = user;

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
      <ThemedHeader title="Eduvalora" />
      <ThemedView padding>
        <View style={{ paddingTop: height * 0.2 }} />
        <ThemedText type="h1" className="mb-2 text-center font-semibold">
          Actualizar Datos Generales
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
