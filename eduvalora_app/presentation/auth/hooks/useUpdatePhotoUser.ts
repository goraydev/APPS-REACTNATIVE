import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../store/store';
import { updatePhoto } from '@/core/auth/actions/auth-action';
import { Alert } from 'react-native';

export default function useUpdatePhotoUser() {
  const { setUser, user } = useAuthStore();

  const mutation = useMutation({
    mutationFn: ({ base64 }: { base64: string }) => updatePhoto(user?.id!, base64, user?.username!),
    onSuccess: (data) => {
      setUser({ ...data, photo: data.photo });
      Alert.alert('Éxito', 'Foto de perfil actualizada correctamente');
    },
    onError: (error: Error) => {
      Alert.alert('Error', error.message);
    },
  });

  return {
    updatePhotoQuery: mutation.mutate,
    isLoading: mutation.isPending,
    data: mutation.data,
    isError: mutation.isError,
  };
}
