import { login } from '@/core/auth/actions/auth-action';
import { UserLogin } from '@/core/auth/interfaces/user';
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';
import { useAuthStore } from '../store/store';
import { router } from 'expo-router';

export const useLoginUser = () => {
  const changeStatus = useAuthStore((state) => state.changeStatus);
  const mutation = useMutation({
    mutationFn: (form: UserLogin) => login(form),
    onSuccess: (data) => {
      console.log(data);
      changeStatus(data);
      router.replace('/(tabs)/(user)/settings');
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
