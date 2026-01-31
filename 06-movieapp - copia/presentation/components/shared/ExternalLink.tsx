import { Linking, Pressable, Text, Alert } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

interface ExternalLinkProps {
  url: string;
  label: string;
  icon?: string;
  className?: string;
}

export default function ExternalLink({
  url,
  label,
  icon = 'external-link',
  className = '',
}: ExternalLinkProps) {
  const handlePress = async () => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', `No se puede abrir el enlace: ${url}`);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al abrir el enlace');
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      className={`flex-row items-center gap-2 rounded-lg bg-blue-500 px-4 py-4 active:bg-blue-600 ${className}`}
    >
      <Text className="text-white font-semibold">{label}</Text>
      {icon && <FontAwesome name={icon as any} size={16} color="white" />}
    </Pressable>
  );
}
