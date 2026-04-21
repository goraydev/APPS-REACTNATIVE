import { Teacher } from '@/core/teachers/interfaces/teachers';
import ThemedText from '@/presentation/shared/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

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
    <Pressable
      className="bg-bg-secondary dark:bg-bg-primary flex flex-row items-center justify-between gap-4 rounded-xl px-4 py-8"
      onPress={() => router.push(`(tabs)/(stack)/${id}`)}>
      <View className="bg-bg-primary dark:bg-bg-secondary rounded-xl p-4">
        <Text className="text-xl font-bold text-white dark:text-black">
          {names.at(0)}
          {paternal_surname.at(0)}
        </Text>
      </View>
      <View className="flex flex-1 flex-col gap-1">
        <View className="flex flex-row flex-wrap gap-1">
          <ThemedText className="text-base font-bold">{names}</ThemedText>
          <ThemedText className="text-base font-bold">{paternal_surname}</ThemedText>
          <ThemedText className="text-base font-bold">{maternal_surname}</ThemedText>
        </View>
        <View className="flex flex-row gap-2">
          {promedio_rating ? (
            <>
              <Ionicons name="star" size={18} color="#ecc513" />
              <ThemedText>{promedio_rating}4.5</ThemedText>
            </>
          ) : (
            <>
              <Ionicons name="star" size={18} color="#ecc513" />
              <ThemedText>Sin evaluaciones</ThemedText>
            </>
          )}
        </View>
        <View className="flex flex-row gap-2">
          <Ionicons name="school-outline" size={18} color="#797979" />
          <ThemedText>{acronym}</ThemedText>
        </View>
      </View>
      <View>
        <Ionicons name="chevron-forward-outline" size={20} color="#797979" />
      </View>
    </Pressable>
  );
}
