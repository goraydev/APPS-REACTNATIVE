import { View, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import { Reply, FormatSendReply } from '../../../core/teachers/interfaces/teachers';
import ThemedText from '@/presentation/shared/ThemedText';
import ThemedTextInput from '@/presentation/shared/ThemedTextInput';
import { useAuthStore } from '@/presentation/auth/store/store';
import useSendCommentReply from '../hoooks/useSendCommentReply';

interface Props {
  reply: Reply;
  id_comentrating: number;
  level?: number;
}

export default function ReplyItem({ reply, id_comentrating, level = 0 }: Props) {
  const user = useAuthStore((state) => state.user);
  const { sendCommentReplyQuery, isLoading } = useSendCommentReply();
  const [showForm, setShowForm] = useState(false);
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    if (!user) {
      Alert.alert('Error', 'Debes iniciar sesión para responder');
      return;
    }
    if (!answer.trim()) return;

    const newAnswer: FormatSendReply = {
      id_user: user.id,
      id_comentrating, // ← siempre el comentario raíz
      answer: answer.trim(),
      parent_answer_id: reply.id_answer, // ← apunta a esta reply
    };

    sendCommentReplyQuery.mutate(newAnswer, {
      onSuccess: () => {
        setAnswer('');
        setShowForm(false);
        sendCommentReplyQuery.reset();
        Alert.alert('Éxito', 'Respuesta enviada');
      },
    });
  };

  // Limitar indentación visual a 4 niveles
  const indentLevel = Math.min(level, 4);

  return (
    <View
      style={{
        marginLeft: indentLevel * 12,
        borderLeftWidth: 2,
        borderLeftColor: level > 3 ? '#ef4444' : '#93c5fd',
        paddingLeft: 8,
        marginTop: 8,
      }}>
      {/* Cabecera */}
      <View className="flex flex-row items-center gap-2">
        <View className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-400">
          <ThemedText className="text-xs font-bold text-white">
            {reply.username?.at(0)?.toUpperCase()}
          </ThemedText>
        </View>
        <View>
          <View className="flex flex-row items-center gap-1">
            <ThemedText type="semibold" className="text-sm">
              {reply.username}
            </ThemedText>
            {reply.parent_username && (
              <>
                <ThemedText className="text-xs text-gray-400">→</ThemedText>
                <ThemedText className="text-xs text-blue-400">@{reply.parent_username}</ThemedText>
              </>
            )}
          </View>
          <ThemedText className="text-xs text-gray-400">
            {new Date(reply.created_at).toLocaleDateString('es-PE')}
          </ThemedText>
        </View>
      </View>

      {/* Contenido */}
      <ThemedText className="mt-1 text-sm">{reply.answer}</ThemedText>

      {/* Botón responder */}
      <Pressable onPress={() => setShowForm(!showForm)} className="mt-1 self-start">
        <ThemedText className="text-xs text-blue-400">
          {showForm ? 'Cancelar' : 'Responder'}
        </ThemedText>
      </Pressable>

      {/* Formulario inline */}
      {showForm && (
        <View className="mt-2 flex flex-row items-center gap-2 rounded-md bg-gray-300 p-2 dark:bg-gray-950">
          <ThemedTextInput
            placeholder={`Responder a ${reply.username}...`}
            value={answer}
            onChangeText={setAnswer}
            multiline
            numberOfLines={3}
            className="flex-1"
            textAlignVertical="top"
          />
          <Pressable
            className="rounded-full bg-bg-primary px-3 py-2 active:bg-blue-800"
            onPress={handleSubmit}
            disabled={isLoading || !answer.trim()}>
            <ThemedText type="semibold" className="text-xs">
              {isLoading ? '...' : 'Enviar'}
            </ThemedText>
          </Pressable>
        </View>
      )}
    </View>
  );
}
