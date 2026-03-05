import useProduct from "@/presentation/products/hooks/useProduct";
import ThemedActivity from "@/presentation/shared/ThemedActivity";
import ThemedHeader from "@/presentation/shared/ThemedHeader";
import ThemedTextInput from "@/presentation/shared/ThemedTextInput";
import ThemedView from "@/presentation/shared/ThemedView";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, View } from "react-native";

export default function ProductoByIdScreen() {
  const { id } = useLocalSearchParams();
  const { productQueryById } = useProduct(id.toString());

  const [product, setProduct] = useState({
    title: "",
    slug: "",
    description: "",
    price: "",
    stock: "",
  });

  if (productQueryById.isLoading) {
    return <ThemedActivity />;
  }

  return (
    <>
      <ThemedHeader title={productQueryById.data?.title ?? ""} />
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ThemedView padding scroll>
          <View className="flex-col gap-4 mt-4">
            <ThemedTextInput
              placeholder="Titulo"
              value={product.title}
              onChangeText={(value) => setProduct({ ...product, title: value })}
            />
            <ThemedTextInput
              placeholder="Slug"
              value={product.slug}
              onChangeText={(value) => setProduct({ ...product, slug: value })}
            />
            <ThemedTextInput
              placeholder="Descripciónn"
              value={product.description}
              onChangeText={(value) =>
                setProduct({ ...product, description: value })
              }
              multiline
              numberOfLines={5}
            />
            <View className="flex flex-row gap-2">
              <ThemedTextInput
                placeholder="Precio"
                className="flex-1"
                value={product.price}
                onChangeText={(value) =>
                  setProduct({ ...product, price: value })
                }
              />
              <ThemedTextInput
                placeholder="stock"
                className="flex-1"
                value={product.stock}
                onChangeText={(value) =>
                  setProduct({ ...product, stock: value })
                }
              />
            </View>
          </View>
        </ThemedView>
      </KeyboardAvoidingView>
    </>
  );
}
