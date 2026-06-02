import { View, Text, StyleSheet, Alert, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CommentsAndRatings, FormatSendReply } from '../../../core/teachers/interfaces/teachers';
import ThemedText from '@/presentation/shared/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '@/presentation/auth/store/store';
import useSendCommentReply from '../hoooks/useSendCommentReply';
import ThemedTextInput from '@/presentation/shared/ThemedTextInput';
import ReplyItem from './ReplyItem';

export default function CardComents(item: CommentsAndRatings) {
  const user = useAuthStore((state) => state.user);
  const { sendCommentReplyQuery, isLoading, data } = useSendCommentReply();
  const [commentAnswer, setCommentAnswer] = useState('');

  const handleSubmitComment = () => {
    if (user === null) {
      Alert.alert('Error', 'Debes iniciar sesión para enviar una respuesta');
      return;
    }

    const newAnswer: FormatSendReply = {
      id_user: user.id,
      id_comentrating: item.id,
      answer: commentAnswer,
      parent_answer_id: null,
    };

    sendCommentReplyQuery.mutate(newAnswer);
    setCommentAnswer('');
    sendCommentReplyQuery.reset();
    Alert.alert('Éxito', 'Respuesta enviada correctamente');
  };

  return (
    <View style={styles.itemContainer}>
      <View className="flex flex-row items-center gap-3">
        <View className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-400">
          <ThemedText type="semibold" className="text-white">
            {item.username?.at(0)?.toUpperCase()}
          </ThemedText>
        </View>
        <View className="flex-1">
          <ThemedText type="semibold">{item.username}</ThemedText>
          <ThemedText className="text-xs text-gray-400">
            {new Date(item.created_at).toLocaleDateString('es-PE')}
          </ThemedText>
        </View>
        {/* Estrellas */}
        <View className="flex flex-row items-center gap-1">
          <Ionicons name="star" size={14} color="#3b82f6" />
          <ThemedText type="semibold">{item.rating}</ThemedText>
        </View>
      </View>

      <ThemedText className="mt-2">{item.coment}</ThemedText>

      {/*Formulario de respuesta*/}

      <View className="flex flex-row items-center justify-center gap-4 rounded-md bg-gray-300 p-2 dark:bg-gray-950">
        <ThemedTextInput
          placeholder="Escribe tu respuesta..."
          value={commentAnswer}
          onChangeText={setCommentAnswer}
          multiline={true}
          numberOfLines={6}
          className="mt-2 flex-1"
          textAlignVertical="top"
          accessibilityLabel="Campo de respuesta"
        />
        <Pressable
          className="justify-center gap-2 rounded-full bg-bg-primary p-4 active:bg-blue-800"
          onPress={handleSubmitComment}
          disabled={isLoading}>
          <ThemedText type="semibold">Responder</ThemedText>
        </Pressable>
      </View>

      {/* Replies */}
      {item.replies?.length > 0 && (
        <View className="mt-3">
          {item.replies.map((reply) => (
            <ReplyItem key={reply.id_answer} reply={reply} id_comentrating={item.id} level={0} />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    padding: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  contentContainer: {
    padding: 16,
  },
});
