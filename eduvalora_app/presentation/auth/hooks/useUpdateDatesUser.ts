import { updateUser } from '@/core/auth/actions/auth-action';
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';
import { useAuthStore } from '../store/store';

export default function useUpdateDatesUser() {
  const { setUser, user } = useAuthStore();
  const mutation = useMutation({
    mutationFn: ({
      username,
      email,
      idUser,
    }: {
      username: string;
      email: string;
      idUser: number;
    }) => updateUser(username, email, idUser),
    onSuccess: (data) => {
      setUser(data);
      Alert.alert('Éxito', 'Datos actualizados');
    },
    onError: (error: Error) => {
      Alert.alert('Error', error.message);
    },
  });

  return {
    updateUserQuery: mutation.mutate,
    isLoading: mutation.isPending,
    data: mutation.data,
    isError: mutation.isError,
  };
}
