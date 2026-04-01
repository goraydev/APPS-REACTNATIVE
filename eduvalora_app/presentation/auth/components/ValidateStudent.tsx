import { View, Text, Alert } from 'react-native';
import React, { useState } from 'react';
import ThemedText from '@/presentation/shared/ThemedText';
import ThemedTextInput from '@/presentation/shared/ThemedTextInput';
import ThemedButton from '@/presentation/shared/ThemedButton';
import { Link } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { useFaculties } from '../hooks/useFaculties';
import ThemedActivity from '@/presentation/shared/ThemedActivity';
import { FacultyUnasam } from '../../../core/auth/interfaces/faculties';
import { useValidateStudent } from '../hooks/useValidateStudent';
import { useAuthStore } from '../store/store';

export default function ValidateStudent() {
  const [DNI, setDNI] = useState('');
  const [facultad, setfacultad] = useState('');
  const { facultiesQuery } = useFaculties();
  const { validateStudent, isLoading, data } = useValidateStudent();
  const setNewUser = useAuthStore((state) => state.setNewUser);

  const handleSubbmit = () => {
    if ([DNI, facultad].some((c) => c === '')) {
      Alert.alert('Error', 'Todos los campos son requeridos');
      return;
    }

    validateStudent({ dni: DNI, faculty: facultad });

    setNewUser({
      dni: +DNI,
      id_faculty: facultad,
      username: '',
      email: '',
      password: '',
    });
  };

  if (facultiesQuery.isLoading) {
    return <ThemedActivity />;
  }

  return (
    <View className="flex flex-col gap-4">
      <ThemedText type="h1" className="text-center">
        Verificar si eres o has sido estudiante santiaguino
      </ThemedText>
      <ThemedTextInput
        value={DNI}
        onChangeText={setDNI}
        placeholder="DNI"
        icon="id-card-outline"
        keyboardType="numeric"
        maxLength={8}
      />
      
      <View className="bg-gray-200 dark:bg-blue-900 ">
        <Picker selectedValue={facultad} onValueChange={(item) => setfacultad(item)}>
          <Picker.Item label="Selecciona una facultad" style={{ color: 'black' }} value="" />
          {facultiesQuery.data?.map((faculty: FacultyUnasam) => (
            <Picker.Item
              label={faculty.nombre}
              value={faculty.id}
              key={faculty.id}
              style={{ color: 'black' }}
            />
          ))}
        </Picker>
      </View>

      {isLoading ? (
        <View className="my-4 flex items-center justify-center">
          <ThemedActivity />
        </View>
      ) : (
        <ThemedButton text="Verificar" onPress={handleSubbmit} />
      )}

      <Link href="/(tabs)/(user)/signin">
        <ThemedText>¿Ya tienes cuenta? Inicia sesión {''}</ThemedText>
        <ThemedText type="link">Aquí</ThemedText>
      </Link>
    </View>
  );
}
