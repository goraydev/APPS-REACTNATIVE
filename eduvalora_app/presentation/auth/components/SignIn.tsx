import { Alert, View } from 'react-native';
import React, { useState } from 'react';
import ThemedText from '@/presentation/shared/ThemedText';
import ThemedTextInput from '@/presentation/shared/ThemedTextInput';
import ThemedButton from '@/presentation/shared/ThemedButton';
import { Link } from 'expo-router';
import { useLoginUser } from '../hooks/useLoginUser';
import ThemedActivity from '@/presentation/shared/ThemedActivity';

export default function SignIn() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { loginUserQuery, isLoading } = useLoginUser();

  const handleSubmit = () => {
    if ([username, password].some((c) => c === '')) {
      Alert.alert('Error', 'Todos los campos son requeridos');
      return;
    }

    loginUserQuery({ username, password });
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
      {isLoading ? (
        <View className="flex flex-col items-center justify-center">
          <ThemedActivity />
        </View>
      ) : (
        <ThemedButton text="Iniciar Sesión" onPress={handleSubmit} />
      )}
      <Link href="/(tabs)/(user)/validatestudent">
        <ThemedText>
          ¿No tienes cuenta? Verifica si eres estudiante santiaguino y crea una cuenta {''}
        </ThemedText>
        <ThemedText type="link">Aquí</ThemedText>
      </Link>
    </View>
  );
}
