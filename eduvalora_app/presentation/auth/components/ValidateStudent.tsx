import { View, Text, Alert } from 'react-native';
import React, { useState } from 'react';
import ThemedText from '@/presentation/shared/ThemedText';
import ThemedTextInput from '@/presentation/shared/ThemedTextInput';
import ThemedButton from '@/presentation/shared/ThemedButton';
import { Link } from 'expo-router';

export default function ValidateStudent() {
  const [DNI, setDNI] = useState('');
  const [facultad, setfacultad] = useState('');

  const handleSubbmit = () => {
    if ([DNI, facultad].some((c) => c === '')) {
      Alert.alert('Error', 'Todos los campos son requeridos');
      return;
    }

    //VALIDATE STUDENT
    console.log({ DNI, facultad });
  };

  return (
    <View className="flex flex-col gap-4">
      <ThemedText type="h1" className="text-center">
        Verificar si eres o has sido estudiante santiaguino
      </ThemedText>

      <ThemedTextInput value={DNI} onChangeText={setDNI} placeholder="DNI" icon="id-card-outline" />
      <ThemedTextInput
        value={facultad}
        onChangeText={setfacultad}
        placeholder="Facultad"
        icon="school-outline"
      />
      <ThemedButton text="Verificar" onPress={handleSubbmit} />
      <Link href="/(tabs)/(user)/signin">
        <ThemedText>¿Ya tienes cuenta? Inicia sesión {''}</ThemedText>
        <ThemedText type="link">Aquí</ThemedText>
      </Link>
    </View>
  );
}
