import { useMutation } from '@tanstack/react-query';
import { User } from '../../../core/auth/interfaces/user';
import { createUser } from '@/core/auth/actions/auth-action';
import { Alert } from 'react-native';
import { useAuthStore } from '../store/store';

export const useCreateUser = () => {
  const setNewUser = useAuthStore((state) => state.setNewUser);
  const mutation = useMutation({
    mutationFn: (newUser: User) => createUser(newUser),
    onSuccess: (data) => {
      Alert.alert('Éxito', 'El usuario se ha creado correctamente');
      setNewUser({
        dni: 0,
        id_faculty: '',
        username: '',
        email: '',
        password: '',
      });
    },
    onError: (error: Error) => {
      //console.error('Error:', error.message);
      Alert.alert('Error', error.message);
    },
  });

  return {
    createNewUser: mutation.mutate,
    isLoading: mutation.isPending,
    data: mutation.data,
    isError: mutation.isError,
  };
};
