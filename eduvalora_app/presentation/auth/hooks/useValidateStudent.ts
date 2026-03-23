import { useMutation, useQuery } from '@tanstack/react-query';
import { validateStudent } from '../../../core/auth/actions/auth-action';
import { router } from 'expo-router';
import { Alert } from 'react-native';

export const useValidateStudent = () => {
  const mutation = useMutation({
    mutationFn: ({ dni, faculty }: { dni: string; faculty: string }) =>
      validateStudent(dni, faculty),
    onSuccess: (data) => {
      console.log('Éxito:', data);
      if (data) {
        router.push('/(tabs)/(user)/signup');
        return;
      }
      Alert.alert('Error', 'No se encontró el estudiante');
    },
    onError: (error) => {
      console.error('Error:', error);
    },
  });

  return {
    validateStudent: mutation.mutate,
    isLoading: mutation.isPending,
    data: mutation.data,
    isError: mutation.isError,
  };
};
