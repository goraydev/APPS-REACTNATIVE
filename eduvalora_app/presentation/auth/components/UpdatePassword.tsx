import { View, Text, Alert } from 'react-native';
import React, { useState } from 'react';
import ThemedTextInput from '@/presentation/shared/ThemedTextInput';
import ThemedButton from '@/presentation/shared/ThemedButton';
import useUpdatePasswordUser from '../hooks/useUpdatePasswordUser';
import { useAuthStore } from '../store/store';
import ThemedActivity from '@/presentation/shared/ThemedActivity';

export default function UpdatePassword() {
  const { user } = useAuthStore();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { updatePasswordQuery } = useUpdatePasswordUser();
  if (!user) return <ThemedActivity />;

  const handleSubmit = () => {
    if (currentPassword === '' || newPassword === '') {
      Alert.alert('Error', 'Todos los campos son requeridos');
      return;
    }

    //enviar a la base de datos
    updatePasswordQuery({
      id: user.id,
      valueCurrentPassword: currentPassword,
      valueNewPassword: newPassword,
    });
    setCurrentPassword('');
    setNewPassword('');
  };

  return (
    <View className="flex flex-col gap-4">
      <ThemedTextInput
        value={currentPassword}
        onChangeText={setCurrentPassword}
        placeholder="Contraseña actual"
        icon="lock-closed-outline"
        secureTextEntry
      />
      <ThemedTextInput
        value={newPassword}
        onChangeText={setNewPassword}
        placeholder="Nueva contraseña"
        icon="lock-closed-outline"
        secureTextEntry
      />
      <ThemedButton text="Actualizar Contraseña" onPress={handleSubmit} />
    </View>
  );
}
