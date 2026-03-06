import React from "react";
import { FlatList, Image, View } from "react-native";

interface Props {
  images: string[];
}

export default function ProductsImages({ images }: Props) {
  if (images.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Image
          source={require("../../../assets/images/no-product-image.png")}
          style={{ width: 300, height: 300 }}
        />
      </View>
    );
  }

  return (
    <FlatList
      data={images}
      keyExtractor={(item) => item}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <Image
          source={{ uri: item }}
          style={{ width: 300, height: 300, borderRadius: 15 }}
        />
      )}
      ItemSeparatorComponent={() => <View className="ml-4" />}
    />
  );
}
