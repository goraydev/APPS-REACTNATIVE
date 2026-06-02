import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import ThemedView from '@/presentation/shared/ThemedView';
import ThemedText from '@/presentation/shared/ThemedText';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import useTeacher from '@/presentation/teachers/hoooks/useTeacher';
import ThemedActivity from '@/presentation/shared/ThemedActivity';
import ThemedTextInput from '@/presentation/shared/ThemedTextInput';
import { useAuthStore } from '@/presentation/auth/store/store';
import useSendCalification from '@/presentation/teachers/hoooks/useSendCalification';

type RatingValue = 0 | 1 | 2 | 3 | 4 | 5;

interface RatingSubmitPayload {
  rating: RatingValue;
  comment: string;
}

interface StarRatingProps {
  rating: RatingValue;
  onRate: (star: RatingValue) => void;
}

const RATING_LABELS: Record<Exclude<RatingValue, 0>, string> = {
  1: 'Muy malo',
  2: 'Malo',
  3: 'Regular',
  4: 'Bueno',
  5: 'Excelente',
};

const STAR_VALUES = [1, 2, 3, 4, 5] as const;

export default function CalificationScreen() {
  const { idcalification } = useLocalSearchParams();
  const navigation = useNavigation();
  const { getTeacherByIdQuery, isLoading, data } = useTeacher(+idcalification);
  const [rating, setRating] = useState<RatingValue>(0);
  const [comment, setComment] = useState<string>('');
  const user = useAuthStore((state) => state.user);
  const { sendCalificationQuery, isLoading: isLoadingCalification } = useSendCalification();

  const handleSubmit = (): void => {
    if (!user) {
      Alert.alert('Error', 'Debes iniciar sesión para enviar una calificación.');
      return;
    }

    if (rating === 0) return;

    //enviar a la base de dato
    sendCalificationQuery.mutate({
      id_user: user.id,
      id_teacher: +idcalification,
      rating,
      comment,
    });
    sendCalificationQuery.reset();
    setRating(0);
    setComment('');
  };

  const isDisabled = rating === 0;

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
      <ThemedView padding>
        <View className="mt-2">
          <ThemedText type="h2" className="font-bold">
            Calificar al Docente
          </ThemedText>
        </View>
        <View className="mt-2 rounded-lg bg-bg-secondary p-4 dark:bg-gray-950">
          <ThemedText type="h1" className="mt-2">
            {data?.names} {data?.paternal_surname} {data?.maternal_surname}
          </ThemedText>
          <ThemedText type="semibold" numberOfLines={2} ellipsizeMode="tail">
            {data?.faculty}
          </ThemedText>
        </View>

        <View className=" mt-2 rounded-lg bg-bg-secondary  p-4 dark:bg-gray-950">
          <ThemedText>Tu calificación</ThemedText>
          <StarRating rating={rating} onRate={setRating} />
        </View>
        <View className=" mt-2 rounded-lg bg-bg-secondary  p-4 dark:bg-gray-950">
          <ThemedText>Tu opinión</ThemedText>
          <ThemedTextInput
            placeholder="Comparte tu experiencia con este docente..."
            value={comment}
            onChangeText={setComment}
            multiline={true}
            numberOfLines={6}
            className="mt-2"
            textAlignVertical="top"
            accessibilityLabel="Campo de comentario"
          />
        </View>
        <View className="mt-4 flex flex-row gap-4">
          <Pressable
            className="flex flex-1 flex-row items-center justify-center gap-2 rounded-full border-2 border-bg-primary active:bg-bg-primary"
            onPress={() => router.back()}>
            <ThemedText type="semibold" className="text-blue-500">
              Cancelar
            </ThemedText>
          </Pressable>
          <Pressable
            className="flex flex-1 flex-row items-center justify-center gap-2 rounded-full bg-bg-primary p-4 active:bg-blue-800"
            onPress={handleSubmit}
            disabled={isDisabled || isLoadingCalification}>
            <ThemedText type="semibold">Enviar calificación</ThemedText>
          </Pressable>
        </View>
      </ThemedView>
    </>
  );
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRate }) => (
  <View style={styles.ratingContainer}>
    <View style={styles.stars}>
      {STAR_VALUES.map((star) => (
        <Pressable
          key={star}
          onPress={() => onRate(star as RatingValue)}
          hitSlop={6}
          accessibilityRole="radio"
          accessibilityLabel={`${star} estrella${star > 1 ? 's' : ''}`}
          accessibilityState={{ checked: rating === star }}>
          <Text style={[styles.star, rating >= star && styles.starActive]}>★</Text>
        </Pressable>
      ))}
    </View>

    {rating > 0 && (
      <Text style={styles.ratingLabel}>{RATING_LABELS[rating as Exclude<RatingValue, 0>]}</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    gap: 16,
    padding: 16,
  },

  // — Estrellas —
  ratingContainer: {
    alignItems: 'center',
    gap: 6,
  },
  stars: {
    flexDirection: 'row',
    gap: 8,
  },
  star: {
    fontSize: 36,
    color: '#6B7280', // gray-400
  },
  starActive: {
    color: '#FB923C', // orange-400
  },
  ratingLabel: {
    fontSize: 14,
    color: '#9CA3AF',
  },

  // — Campo de texto —
  fieldContainer: {
    gap: 8,
  },
  label: {
    color: '#F9FAFB',
    fontSize: 14,
  },
  textarea: {
    backgroundColor: '#374151', // gray-700
    color: '#FFFFFF',
    borderBottomWidth: 2,
    borderBottomColor: '#111827', // gray-900
    borderRadius: 8,
    padding: 10,
    minHeight: 100,
    fontSize: 14,
  },

  // — Botones —
  actions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  btn: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCancel: {
    backgroundColor: '#374151',
  },
  btnSubmit: {
    // gradiente simulado con un color sólido; ver nota abajo
    backgroundColor: '#3B82F6',
  },
  btnDisabled: {
    opacity: 0.5,
  },
  btnText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});
