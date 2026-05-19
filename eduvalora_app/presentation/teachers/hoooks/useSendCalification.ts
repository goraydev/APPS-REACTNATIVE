import { submitCalification } from '@/core/teachers/actions/teacher-action';
import { Calification } from '@/core/teachers/interfaces/teachers';
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';

export default function useSendCalification() {
  const sendCalificationQuery = useMutation({
    mutationFn: (newCalification: Calification) => submitCalification(newCalification),
    onSuccess: () => {
      Alert.alert('Éxito', 'La calificación se ha enviado correctamente');
    },
    onError: (error: Error) => {
      Alert.alert('Error', error.message);
    },
  });

  return {
    sendCalificationQuery: sendCalificationQuery,
    isLoading: sendCalificationQuery.isPending,
    data: sendCalificationQuery.data,
    isError: sendCalificationQuery.isError,
  };
}
