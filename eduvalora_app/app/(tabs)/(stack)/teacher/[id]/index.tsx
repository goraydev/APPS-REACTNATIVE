import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ThemedView from '@/presentation/shared/ThemedView';
import ThemedText from '@/presentation/shared/ThemedText';
import { router, useLocalSearchParams } from 'expo-router';
import useTeacher from '@/presentation/teachers/hoooks/useTeacher';
import ThemedActivity from '@/presentation/shared/ThemedActivity';
import { useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import BottomSheet, { BottomSheetFlatList, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import useGetCalificationsComments from '@/presentation/teachers/hoooks/useGetCalificationsComments';
import { CommentsAndRatings } from '@/core/teachers/interfaces/teachers';
import CardComents from '@/presentation/teachers/components/CardComents';
import useSendCommentReply from '@/presentation/teachers/hoooks/useSendCommentReply';
import { useAuthStore } from '@/presentation/auth/store/store';

export default function TeacherScreen() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const sheetRef = useRef<BottomSheet>(null);
  const [replyingTo, setReplyingTo] = useState<{
    id_comentrating: number;
    parent_answer_id: number | null;
    username: string;
  } | null>(null);
  const user = useAuthStore((state) => state.user);

  const [commentText, setCommentText] = useState('');
  const { sendCommentReplyQuery } = useSendCommentReply(+id);

  const snapPoints = useMemo(() => ['25%', '50%', '75%'], []);

  const { getTeacherByIdQuery, isLoading, data } = useTeacher(+id);
  const {
    getCalificationsCommentsQuery,
    isLoadingCalificationsComments,
    dataCalificationsComments,
  } = useGetCalificationsComments(+id);

  const handleSend = () => {
    if (!user || !commentText.trim() || !replyingTo) return;
    sendCommentReplyQuery.mutate(
      {
        id_user: user.id,
        id_comentrating: replyingTo.id_comentrating,
        answer: commentText.trim(),
        parent_answer_id: replyingTo.parent_answer_id,
      },
      {
        onSuccess: () => {
          setCommentText('');
          setReplyingTo(null);
        },
      }
    );
  };

  // callbacks
  const handleSheetChange = useCallback((index) => {
    console.log('handleSheetChange', index);
  }, []);

  const handleOpenComments = useCallback(() => {
    sheetRef.current?.snapToIndex(1);
  }, []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    []
  );

  useEffect(() => {
    navigation.setOptions({
      title: 'Volver',
      headerTitleStyle: {
        fontSize: 16,
        fontWeight: 'bold',
      },
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        await getTeacherByIdQuery.refetch();
        await getCalificationsCommentsQuery.refetch();
      };
      fetchData();
    }, [id])
  );

  if (isLoading) {
    return <ThemedActivity />;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <ThemedView padding scroll>
        <View className="flex items-center justify-center">
          <View className="mt-2 flex items-center justify-center rounded-xl bg-bg-primary p-8 dark:bg-gray-950">
            <ThemedText type="h1" className="font-bold">
              {data?.names.at(0)}
              {data?.paternal_surname.at(0)}
            </ThemedText>
          </View>
          <ThemedText type="h1" className="mt-2 text-center">
            {data?.names} {data?.paternal_surname} {data?.maternal_surname}
          </ThemedText>
          <Text className="text-blue-500">DOCENTE</Text>
          <View className="mt-2 flex flex-row items-center justify-center gap-2">
            <Text className="rounded-full bg-blue-300 px-4 py-2">{data?.acronym}</Text>
            <Text className="rounded-full bg-bg-primary p-2">{data?.dedication}</Text>
          </View>
        </View>
        <View className="mt-4 flex flex-row gap-2">
          <View className="flex-1 items-center justify-center rounded-md bg-gray-300 p-2 dark:bg-gray-950">
            <Ionicons name="star" size={24} color="#3b82f6" />
            <ThemedText type="semibold" className="text-3xl">
              {Number(data?.promedio_rating)?.toFixed(1)}
            </ThemedText>
            <ThemedText>RATING</ThemedText>
          </View>
          <View className="flex-1 items-center justify-center gap-1 rounded-md bg-gray-300 p-2 dark:bg-gray-950">
            <Ionicons name="stats-chart-outline" size={24} color="#3b82f6" />
            <ThemedText type="semibold" className="text-3xl">
              {data?.total_evaluaciones}
            </ThemedText>
            <ThemedText>EVALUACIONES</ThemedText>
          </View>
        </View>
        <View>
          <ThemedText className="my-4">INFORMACIÓN ACADÉMICA</ThemedText>
          <View className="gap-4 overflow-hidden rounded-md bg-gray-300 p-4 dark:bg-gray-950">
            <View className="flex flex-1 flex-row items-center gap-4">
              <View className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 dark:bg-gray-900">
                <Ionicons name="school-outline" size={24} color="white" />
              </View>
              <View className="flex-1">
                <ThemedText>FACULTAD</ThemedText>
                <ThemedText type="semibold" numberOfLines={2} ellipsizeMode="tail">
                  {data?.faculty}
                </ThemedText>
              </View>
            </View>
            <View className="flex flex-row items-center gap-4">
              <View className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 dark:bg-gray-900">
                <Ionicons name="briefcase-outline" size={24} color="white" />
              </View>
              <View>
                <ThemedText>CATEGORIA</ThemedText>
                <ThemedText type="semibold">{data?.category}</ThemedText>
              </View>
            </View>
          </View>
        </View>
        <View>
          <ThemedText className="my-4">CONTACO Y REGISTRO</ThemedText>
          <View className="gap-4 rounded-md bg-gray-300 p-4 dark:bg-gray-950">
            <View className="flex flex-row items-center gap-4">
              <View className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 dark:bg-gray-900">
                <Ionicons name="call-outline" size={24} color="white" />
              </View>
              <View>
                <ThemedText>CELULAR</ThemedText>
                <ThemedText type="semibold">{data?.cellphone}</ThemedText>
              </View>
            </View>
            <View className="flex flex-row items-center gap-4">
              <View className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 dark:bg-gray-900">
                <Ionicons name="mail-outline" size={24} color="white" />
              </View>
              <View>
                <ThemedText>EMAIL</ThemedText>
                <ThemedText type="semibold">{data?.email}</ThemedText>
              </View>
            </View>
          </View>
        </View>
        <View className="my-4 flex flex-row gap-4">
          <Pressable
            className="flex flex-1 flex-row items-center justify-center gap-2 rounded-full bg-bg-primary p-4 active:bg-blue-800"
            onPress={() => router.push(`(tabs)/(stack)/calification/${id}`)}>
            <Ionicons name="star" size={24} color="white" />
            <ThemedText type="semibold">Calificar</ThemedText>
          </Pressable>
          <Pressable
            className="flex flex-1 flex-row items-center justify-center gap-2 rounded-full border-2 border-bg-primary active:bg-bg-primary"
            onPress={handleOpenComments}>
            <Ionicons name="chatbubble" size={24} color="#3b82f6" />
            <ThemedText type="semibold" className="text-blue-500">
              Ver Comentarios
            </ThemedText>
          </Pressable>
        </View>
      </ThemedView>
      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        onChange={handleSheetChange}>
        <BottomSheetFlatList
          data={dataCalificationsComments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CardComents
              {...item}
              key={item.id}
              onReplyTo={(id_comentrating, parent_answer_id, username) =>
                setReplyingTo({ id_comentrating, parent_answer_id, username })
              }
            />
          )}
          contentContainerStyle={styles.contentContainer}
          className="bg-gray-300 dark:bg-gray-950"
          ListEmptyComponent={
            <View className="items-center justify-center py-8">
              <Ionicons name="chatbubble-outline" size={40} color="#9ca3af" />
              <ThemedText className="mt-2 text-gray-400">Sin comentarios aún</ThemedText>
            </View>
          }
        />
      </BottomSheet>
    </GestureHandlerRootView>
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
