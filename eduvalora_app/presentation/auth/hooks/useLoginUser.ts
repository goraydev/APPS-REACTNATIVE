import { login } from '@/core/auth/actions/auth-action';
import { UserLogin } from '@/core/auth/interfaces/user';
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';

export const useLoginUser = () => {
  const mutation = useMutation({
    mutationFn: (form: UserLogin) => login(form),
    onSuccess: (data) => {
      console.log('exito al iniciar sesión', data);
      
    },
    onError: (error: Error) => {
      Alert.alert('Error', error.message);
    },
  });

  return {
    loginUserQuery: mutation.mutate,
    isLoading: mutation.isPending,
    data: mutation.data,
    isError: mutation.isError,
  };
};
