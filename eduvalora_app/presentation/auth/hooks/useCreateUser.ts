import { useMutation } from '@tanstack/react-query';
import { User } from '../../../core/auth/interfaces/user';
import { createUser } from '@/core/auth/actions/auth-action';
import { Alert } from 'react-native';

export const useCreateUser = () => {
  const mutation = useMutation({
    mutationFn: (newUser: User) => createUser(newUser),
    onSuccess: (data) => {
      console.log('Éxito al crear usuario:', data);
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
