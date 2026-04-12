import React, { useEffect } from 'react';
import ThemedView from '@/presentation/shared/ThemedView';
import ThemedText from '@/presentation/shared/ThemedText';
import { useLocalSearchParams } from 'expo-router';
import useTeacher from '@/presentation/teachers/hoooks/useTeacher';
import ThemedActivity from '@/presentation/shared/ThemedActivity';
import { useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

export default function TeacherScreen() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const { getTeacherByIdQuery, isLoading, data } = useTeacher(+id);

  useEffect(() => {
    if (!data) return;
    getTeacherByIdQuery.refetch();
    navigation.setOptions({
      title: 'Volver',
      headerTitleStyle: {
        fontSize: 16,
        fontWeight: 'bold',
      },
    });
  }, [data]);

  if (isLoading) {
    return <ThemedActivity />;
  }

  return (
    <>
      <ThemedView padding scroll>
        <View className="flex items-center justify-center">
          <View className="mt-2 flex items-center justify-center rounded-xl bg-blue-500 p-8 dark:bg-gray-950">
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
            <Text className="rounded-full bg-blue-500 p-2">{data?.dedication}</Text>
          </View>
        </View>
        <View className="mt-4 flex flex-row gap-2">
          <View className="flex-1 items-center justify-center rounded-md bg-gray-300 p-2 dark:bg-gray-950">
            <Ionicons name="star" size={24} color="#3b82f6" />
            <ThemedText type="semibold" className="text-3xl">
              {data?.promedio_rating}
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
                <ThemedText type='semibold' numberOfLines={2} ellipsizeMode="tail">
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
          <Pressable className="flex flex-1 flex-row items-center justify-center gap-2 rounded-full bg-blue-500 p-4 active:bg-blue-600">
            <Ionicons name="star" size={24} color="white" />
            <ThemedText type="semibold">Calificar</ThemedText>
          </Pressable>
          <Pressable className="flex flex-1 flex-row items-center justify-center gap-2 rounded-full border-2 border-blue-500 active:bg-blue-600">
            <Ionicons name="chatbubble" size={24} color="#3b82f6" />
            <ThemedText type="semibold" className="text-blue-500">
              Comentar
            </ThemedText>
          </Pressable>
        </View>
      </ThemedView>
    </>
  );
}
