import { useMutation } from '@tanstack/react-query';
import { User } from '../../../core/auth/interfaces/user';
import { createStudent } from '@/core/auth/actions/auth-action';

export const useCreateUser = () => {
  const mutation = useMutation({
    mutationFn: (newUser: User) => createStudent(newUser),
    onSuccess: (data) => {
      console.log('Éxito:', data);
    },
    onError: (error) => {
      console.error('Error:', error);
    },
  });

  return {
    createNewUser: mutation.mutate,
    isLoading: mutation.isPending,
    data: mutation.data,
    isError: mutation.isError,
  };
};
