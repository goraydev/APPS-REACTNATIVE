import React, { useCallback, useEffect, useMemo, useRef } from 'react';
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

export default function TeacherScreen() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const sheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const { getTeacherByIdQuery, isLoading, data } = useTeacher(+id);
  const {
    getCalificationsCommentsQuery,
    isLoadingCalificationsComments,
    dataCalificationsComments,
  } = useGetCalificationsComments(+id);

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

  const renderItem = useCallback(
    ({ item }: { item: CommentsAndRatings }) => (
      <View style={styles.itemContainer}>
        {/* Cabecera: avatar + usuario + rating */}
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

        {/* Comentario */}
        <ThemedText className="mt-2">{item.coment}</ThemedText>

        {/* Replies */}
        {item.replies?.length > 0 && (
          <View className="mt-2 border-l-2 border-blue-300 pl-3">
            {item.replies.map((reply) => (
              <View key={reply.id_answer} className="mt-2">
                <ThemedText type="semibold" className="text-sm">
                  {reply.username}
                  {reply.parent_username ? (
                    <ThemedText className="text-sm text-blue-400">
                      {' '}
                      → {reply.parent_username}
                    </ThemedText>
                  ) : null}
                </ThemedText>
                <ThemedText className="text-sm">{reply.answer}</ThemedText>
              </View>
            ))}
          </View>
        )}
      </View>
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
          renderItem={({ item }) => <CardComents {...item} key={item.id} />}
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
