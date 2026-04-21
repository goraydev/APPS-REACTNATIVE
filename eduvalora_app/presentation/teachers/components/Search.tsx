import React, { useState } from 'react';
import ThemedTextInput from '@/presentation/shared/ThemedTextInput';
import { View } from 'react-native';

export default function Search() {
  const [searchBox, setSearchBox] = useState('');

  return (
    <View className="mt-4 px-4">
      <ThemedTextInput
        value={searchBox}
        onChangeText={setSearchBox}
        placeholder="Buscar Docente"
        icon="search-outline"
        className="rounded-xl"
      />
    </View>
  );
}
