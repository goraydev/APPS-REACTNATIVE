import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../store/store';
import { updatePassword } from '@/core/auth/actions/auth-action';
import { Alert } from 'react-native';

export default function useUpdatePasswordUser() {
  const mutation = useMutation({
    mutationFn: ({
      id,
      valueCurrentPassword,
      valueNewPassword,
    }: {
      id: number;
      valueCurrentPassword: string;
      valueNewPassword: string;
    }) => updatePassword(id, valueCurrentPassword, valueNewPassword),
    onSuccess: (data) => {
      Alert.alert('Éxito', 'Contraseña actualizada correctamente');
    },
    onError: (error: Error) => {
      Alert.alert('Error', error.message);
    },
  });

  return {
    updatePasswordQuery: mutation.mutate,
    isLoading: mutation.isPending,
    data: mutation.data,
    isError: mutation.isError,
  };
}
