import { Teacher } from '@/core/teachers/interfaces/teachers';
import ThemedText from '@/presentation/shared/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, View } from 'react-native';

export default function CardTeacher(teacher: Teacher) {
  const {
    id,
    names,
    paternal_surname,
    maternal_surname,
    acronym,
    total_evaluaciones,
    promedio_rating,
  } = teacher;
  return (
    <View className="ml-2 flex w-1/2 flex-col justify-between gap-2 rounded-md bg-blue-700 p-4">
      <View className="flex flex-row flex-wrap gap-1">
        <ThemedText className="text-sm font-semibold ">{names}</ThemedText>
        <ThemedText className="text-sm font-semibold ">{paternal_surname}</ThemedText>
        <ThemedText className="text-sm font-semibold ">{maternal_surname}</ThemedText>
      </View>
      <View className="flex flex-row items-center gap-2">
        {promedio_rating ? (
          <>
            <Ionicons name="star-outline" size={18} color="#ecc513" />
            <ThemedText className="text-white">{promedio_rating}</ThemedText>
            <ThemedText className="text-white">{total_evaluaciones} calificaciones</ThemedText>{' '}
          </>
        ) : (
          <>
            <Ionicons name="star-outline" size={18} color="#ecc513" />
            <ThemedText className="text-sm">({total_evaluaciones} calificaciones)</ThemedText>
          </>
        )}
      </View>

      <ThemedText className="text-md" type="semibold">
        {acronym}
      </ThemedText>
      <Pressable
        className="flex flex-row justify-between rounded-md bg-blue-800 p-2"
        onPress={() => router.push(`/(tabs)/(stack)/${id}`)}>
        <ThemedText>Ver detalles</ThemedText>
        <Ionicons name="arrow-forward" size={18} color="#fff" />
      </Pressable>
    </View>
  );
}
