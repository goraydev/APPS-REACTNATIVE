import { View, Text, useWindowDimensions } from 'react-native';
import React, { useState } from 'react';
import ThemedText from '@/presentation/shared/ThemedText';
import ThemedTextInput from '@/presentation/shared/ThemedTextInput';
import ThemedButton from '@/presentation/shared/ThemedButton';

export default function SignIn() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { height } = useWindowDimensions();
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
      <ThemedButton text="Iniciar Sesión" onPress={() => {}} />
    </View>
  );
}
