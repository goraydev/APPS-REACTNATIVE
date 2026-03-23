import { View, KeyboardAvoidingView, useWindowDimensions, Alert } from 'react-native';
import React, { useState } from 'react';
import ThemedText from '@/presentation/shared/ThemedText';
import ThemedTextInput from '@/presentation/shared/ThemedTextInput';
import ThemedView from '@/presentation/shared/ThemedView';
import ThemedButton from '@/presentation/shared/ThemedButton';
import { useAuthStore } from '../store/store';
import { useCreateUser } from '../hooks/useCreateUser';
import ThemedActivity from '@/presentation/shared/ThemedActivity';

export default function SignUp() {
  const { height } = useWindowDimensions();
  const studentValidated = useAuthStore((state) => state.newUser);
  const { createNewUser, isLoading, data } = useCreateUser();

  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleSubmit = () => {
    if (Object.values(newUser).some((value) => value === '')) {
      Alert.alert('Error', 'Por favor, rellena todos los campos');
      return;
    }

    const dataNewUser = {
      ...studentValidated,
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
    };

    createNewUser(dataNewUser);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ThemedView scroll padding>
        <View className="mt-4 flex-col gap-4" style={{ paddingTop: height * 0.2 }}>
          <ThemedText type="h2" className="text-center">
            Crea un nombre de usuario creativo para proteger tu identidad y mantener tu seguridad
          </ThemedText>
          <ThemedTextInput
            value={newUser.username}
            onChangeText={(text) => setNewUser({ ...newUser, username: text })}
            placeholder="Ejemplo: estudiante-creativo"
            icon="person-circle-outline"
          />
          <ThemedTextInput
            value={newUser.email}
            onChangeText={(text) => setNewUser({ ...newUser, email: text })}
            placeholder="mail@gmail.com"
            icon="mail-open-outline"
            keyboardType="email-address"
          />
          <ThemedTextInput
            value={newUser.password}
            onChangeText={(text) => setNewUser({ ...newUser, password: text })}
            placeholder="Crea una contraseña"
            icon="lock-closed-outline"
            secureTextEntry
          />
          {isLoading ? (
            <View className="flex flex-col items-center justify-center">
              <ThemedActivity />
            </View>
          ) : (
            <ThemedButton text="Crear Usuario" onPress={handleSubmit} />
          )}
        </View>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}
