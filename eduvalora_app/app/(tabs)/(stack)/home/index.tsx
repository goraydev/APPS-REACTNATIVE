import React, { useEffect, useState } from 'react';
import ThemedText from '@/presentation/shared/ThemedText';
import ThemedView from '@/presentation/shared/ThemedView';
import ThemedHeader from '@/presentation/shared/ThemedHeader';
import useTeachers from '@/presentation/teachers/hoooks/useTeachers';
import ThemedActivity from '@/presentation/shared/ThemedActivity';
import { FlatList, KeyboardAvoidingView, Text, View } from 'react-native';
import CardTeacher from '@/presentation/teachers/components/CardTeacher';
import { LinearGradient } from 'expo-linear-gradient';
import Search from '@/presentation/teachers/components/Search';
import ThemedTextInput from '@/presentation/shared/ThemedTextInput';

export default function HomeScreen() {
  const [searchBox, setSearchBox] = useState('');
  const { getTeachersQuery, isLoading, data } = useTeachers();

  useEffect(() => {
    getTeachersQuery.refetch();
  }, []);

  if (isLoading) {
    return <ThemedActivity />;
  }

  const filteredTeachers = !isLoading
    ? data?.filter((teacher) =>
        (teacher.paternal_surname + ' ' + teacher.maternal_surname + ' ' + teacher.names)
          .toLowerCase()
          .includes(searchBox.toLowerCase())
      )
    : [];

  return (
    <>
      <ThemedHeader title="Eduvalora" />
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <ThemedView padding>
          <LinearGradient
            colors={['#1a1a6e', '#2563eb', '#0ea5e9']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ borderRadius: 12, paddingVertical: 20, marginTop: 10 }}>
            <Text className="mt-2 text-center text-4xl font-bold text-white">
              Califica a tu Docente Santiaguino
            </Text>
            <Text className="mt-2 px-4 text-center text-xl text-white">
              Descubre y evalúa a los mejores docentes de la Universidad Nacional Santiago Antúnez
              de Mayolo. Tu opinión construye una mejor educación.
            </Text>
            <View className="mt-4 px-4">
              <ThemedTextInput
                value={searchBox}
                onChangeText={setSearchBox}
                placeholder="Buscar Docente"
                icon="search-outline"
                className="rounded-xl"
              />
            </View>
          </LinearGradient>
          <View className="mt-4">
            <ThemedText type="h2" className="font-bold">
              Directorio Completo
            </ThemedText>
            <ThemedText>Explora a todos los docentes de la UNASAM</ThemedText>
          </View>

          <FlatList
            data={filteredTeachers}
            numColumns={1}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <CardTeacher {...item} key={item.id} />}
            ItemSeparatorComponent={() => <View className="mb-2" />}
            className="my-4"
          />
        </ThemedView>
      </KeyboardAvoidingView>
    </>
  );
}
