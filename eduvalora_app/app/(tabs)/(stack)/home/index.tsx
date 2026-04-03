import React, { useEffect } from 'react';
import ThemedText from '@/presentation/shared/ThemedText';
import ThemedView from '@/presentation/shared/ThemedView';
import ThemedHeader from '@/presentation/shared/ThemedHeader';
import useTeachers from '@/presentation/teachers/hoooks/useTeachers';
import ThemedActivity from '@/presentation/shared/ThemedActivity';
import { FlatList, KeyboardAvoidingView, View } from 'react-native';
import CardTeacher from '@/presentation/teachers/components/CardTeacher';
import Search from '@/presentation/teachers/components/Search';

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
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <ThemedView>
          <ThemedText type="h2" className="mt-2 text-center text-2xl font-bold">
            Califica a tu Docente Santiaguino
          </ThemedText>
          <ThemedText type="normal" className="mt-2 px-4 text-center">
            Descubre y evalúa a los mejores docentes de la Universidad Nacional Santiago Antúnez de
            Mayolo. Tu opinión construye una mejor educación.
          </ThemedText>

          <FlatList
            data={data}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <CardTeacher {...item} key={item.id} />}
            ItemSeparatorComponent={() => <View className="mb-2 mr-2" />}
            className="my-4"
          />
          <Search />
        </ThemedView>
      </KeyboardAvoidingView>
    </>
  );
}
