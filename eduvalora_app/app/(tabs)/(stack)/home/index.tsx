import React, { useEffect } from 'react';
import ThemedText from '@/presentation/shared/ThemedText';
import ThemedView from '@/presentation/shared/ThemedView';
import ThemedHeader from '@/presentation/shared/ThemedHeader';
import useTeachers from '@/presentation/teachers/hoooks/useTeachers';
import ThemedActivity from '@/presentation/shared/ThemedActivity';
import { FlatList, View } from 'react-native';
import CardTeacher from '@/presentation/teachers/components/CardTeacher';

export default function HomeScreen() {
  const { getTeachersQuery, isLoading, data } = useTeachers();

  useEffect(() => {
    getTeachersQuery.refetch();
  }, []);

  if (isLoading) {
    return <ThemedActivity />;
  }

  return (
    <>
      <ThemedHeader title="Eduvalora" />
      <ThemedView>
        <ThemedText type="h2" className="mt-2 text-center text-2xl font-bold">
          Califica a tu Docente Santiaguino
        </ThemedText>
        <ThemedText type="normal" className="mt-2 text-center px-4">
          Descubre y evalúa a los mejores docentes de la Universidad Nacional Santiago Antúnez de
          Mayolo. Tu opinión construye una mejor educación.
        </ThemedText>

        <FlatList
          data={data}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <CardTeacher {...item} key={item.id} />}
          ItemSeparatorComponent={() => <View className="mb-2 mr-2" />}
          className="mt-4"
        />
      </ThemedView>
    </>
  );
}
