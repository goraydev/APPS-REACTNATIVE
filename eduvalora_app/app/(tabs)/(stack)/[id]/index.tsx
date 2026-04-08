import React, { useEffect } from 'react';
import ThemedView from '@/presentation/shared/ThemedView';
import ThemedText from '@/presentation/shared/ThemedText';
import { useLocalSearchParams } from 'expo-router';
import useTeacher from '@/presentation/teachers/hoooks/useTeacher';
import ThemedActivity from '@/presentation/shared/ThemedActivity';
import { useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TeacherScreen() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const { getTeacherByIdQuery, isLoading, data } = useTeacher(+id);

  useEffect(() => {
    if (!data) return;
    getTeacherByIdQuery.refetch();
    navigation.setOptions({
      title: data?.names + ' ' + data?.paternal_surname + ' ' + data?.maternal_surname,
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
      <ThemedView padding>
        {data?.promedio_rating ? (
          <>
            <Ionicons name="star-outline" size={18} color="#ecc513" />
            <ThemedText className="text-white">{data?.promedio_rating}</ThemedText>
            <ThemedText className="text-white">
              {data?.total_evaluaciones} calificaciones
            </ThemedText>{' '}
          </>
        ) : (
          <>
            <Ionicons name="star-outline" size={18} color="#ecc513" />
            <ThemedText className="text-sm">({data?.total_evaluaciones} calificaciones)</ThemedText>
          </>
        )}
      </ThemedView>
    </>
  );
}
