import { Alert, View } from 'react-native';
import React, { useState } from 'react';
import ThemedText from '@/presentation/shared/ThemedText';
import ThemedTextInput from '@/presentation/shared/ThemedTextInput';
import ThemedButton from '@/presentation/shared/ThemedButton';

export default function SignIn() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if ([username, password].some((c) => c === '')) {
      Alert.alert('Error', 'Todos los campos son requeridos');
      return;
    }
    //SIGN IN
    console.log({ username, password });
  };
  return (
    <View className="flex flex-col gap-4">
      <ThemedText type="h1" className="text-center">
        Iniciar Sesión
      </ThemedText>
      <ThemedTextInput
        value={username}
        onChangeText={setUserName}
        placeholder="Usuario"
        icon="person-circle-outline"
      />
      <ThemedTextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        icon="lock-closed-outline"
      />
      <ThemedButton text="Iniciar Sesión" onPress={handleSubmit} />
    </View>
  );
}
