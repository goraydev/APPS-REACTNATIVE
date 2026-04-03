import React, { useState } from 'react';
import ThemedTextInput from '@/presentation/shared/ThemedTextInput';
import { View } from 'react-native';

export default function Search() {
  const [searchBox, setSearchBox] = useState('');

  return (
    <View className='absolute bottom-4 w-full px-4'>
    <ThemedTextInput
      value={searchBox}
      onChangeText={setSearchBox}
      placeholder="Buscar Docente"
      icon="search-outline"
      className='bg-blue-300'
    />
    </View>
  );
}
