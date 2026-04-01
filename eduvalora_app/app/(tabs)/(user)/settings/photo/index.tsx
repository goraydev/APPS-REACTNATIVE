import React, { useState } from 'react';
import ThemedHeader from '@/presentation/shared/ThemedHeader';
import ThemedText from '@/presentation/shared/ThemedText';
import ThemedView from '@/presentation/shared/ThemedView';
import { Alert, Image, Pressable, TextInput, useWindowDimensions, View } from 'react-native';
import { useAuthStore } from '@/presentation/auth/store/store';
import ThemedActivity from '@/presentation/shared/ThemedActivity';
import { Ionicons } from '@expo/vector-icons';
import ThemedButton from '@/presentation/shared/ThemedButton';
import * as ImagePicker from 'expo-image-picker';
import useUpdatePhotoUser from '@/presentation/auth/hooks/useUpdatePhotoUser';

export default function PhotoScreen() {
  const { height } = useWindowDimensions();
  const { user } = useAuthStore();
  const [image, setImage] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const { updatePhotoQuery, isLoading } = useUpdatePhotoUser();

  if (!user) return <ThemedActivity />;

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permiso Requerido', 'Permiso para acceder a la galería de fotos');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (
      result.canceled ||
      !result.assets ||
      result.assets.length === 0 ||
      result.assets[0].base64 === undefined
    ) {
      return;
    }

    setImageBase64(result.assets[0].base64);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handlePhoto = () => {
    if (imageBase64 !== null) {
      //Subir a la base de datos
      console.log({ base64: imageBase64.slice(0, 20) });
      updatePhotoQuery({ base64: imageBase64 });
    }
  };

  return (
    <>
      <ThemedHeader title="Eduvalora" />
      <ThemedView padding>
        <View style={{ paddingTop: height * 0.2 }} />
        <ThemedText type="h1" className="mb-2 text-center font-semibold">
          Actualizar Foto de Perfil
        </ThemedText>
        <View className="flex flex-col gap-4">
          <ThemedText type="semibold">Foto de Perfil: </ThemedText>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200, borderRadius: 100, alignSelf: 'center' }}
            />
          )}
          <Pressable
            onPress={pickImage}
            className="flex flex-row items-center justify-center gap-4 rounded-md border-x-2 border-y-2 border-blue-400 p-2">
            <Ionicons name="cloud-upload-outline" size={42} color="gray" />
          </Pressable>
          <ThemedButton text="Actualizar" onPress={handlePhoto} />
        </View>
      </ThemedView>
    </>
  );
}
