import { sendCommentReply } from '@/core/teachers/actions/teacher-action';
import { FormatSendReply } from '@/core/teachers/interfaces/teachers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';

export default function useSendCommentReply() {
  const queryClient = useQueryClient();
  const sendCommentReplyQuery = useMutation({
    mutationFn: (newCommentReply: FormatSendReply) => sendCommentReply(newCommentReply),
    onSuccess: () => {
      Alert.alert('Éxito', 'La respuesta se ha enviado correctamente');
      queryClient.invalidateQueries({
        queryKey: ['califications_comments'],
      });
    },
    onError: (error: Error) => {
      Alert.alert('Error', error.message);
    },
  });

  return {
    sendCommentReplyQuery: sendCommentReplyQuery,
    isLoading: sendCommentReplyQuery.isPending,
    data: sendCommentReplyQuery.data,
    isError: sendCommentReplyQuery.isError,
  };
}
