import { Size } from "@/core/products/interfaces/product.interfaces";
import ProductsImages from "@/presentation/products/components/ProductsImages";
import useProduct from "@/presentation/products/hooks/useProduct";
import ThemedActivity from "@/presentation/shared/ThemedActivity";
import ThemedButton from "@/presentation/shared/ThemedButton";
import ThemedHeader from "@/presentation/shared/ThemedHeader";
import ThemedTextInput from "@/presentation/shared/ThemedTextInput";
import ThemedView from "@/presentation/shared/ThemedView";
import ThemedButtonGroup from "@/presentation/theme/components/ThemedButtonGroup";
import { useLocalSearchParams } from "expo-router";
import { Formik } from "formik";
import React, { useState } from "react";
import { KeyboardAvoidingView, View } from "react-native";

export default function ProductoByIdScreen() {
  const { id } = useLocalSearchParams();
  const { productQueryById, productMutation } = useProduct(id.toString());

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
  if (productQueryById.data === undefined) {
    return <ThemedActivity />;
  }

  const productData = productQueryById.data;

  return (
    <>
      <ThemedHeader title={productQueryById.data?.title ?? ""} />
      <Formik
        initialValues={productData}
        onSubmit={(productLike) => {
          productMutation.mutate(productLike);
        }}
      >
        {({ values, handleSubmit, handleChange, setFieldValue }) => (
          <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <ThemedView scroll>
              <ProductsImages images={values.images} />
              <ThemedView padding>
                <View className="flex-col gap-4 mt-4">
                  <ThemedTextInput
                    placeholder="Titulo"
                    value={values.title}
                    onChangeText={handleChange("title")}
                  />
                  <ThemedTextInput
                    placeholder="Slug"
                    value={values.slug}
                    onChangeText={handleChange("slug")}
                  />
                  <ThemedTextInput
                    placeholder="Descripciónn"
                    value={values.description}
                    onChangeText={handleChange("description")}
                    multiline
                    numberOfLines={5}
                  />
                  <View className="flex flex-row gap-2">
                    <ThemedTextInput
                      placeholder="Precio"
                      className="flex-1"
                      value={values.price.toString()}
                      onChangeText={handleChange("price")}
                    />
                    <ThemedTextInput
                      placeholder="stock"
                      className="flex-1"
                      value={values.stock.toString()}
                      onChangeText={handleChange("stock")}
                    />
                  </View>
                </View>
                <View>
                  <ThemedButtonGroup
                    options={["XS", "S", "M", "L", "XL", "XXL", "XXXL"]}
                    selectedOptions={values.sizes}
                    onSelect={(selectedSize) => {
                      const newSizes = values.sizes.includes(
                        selectedSize as Size,
                      )
                        ? values.sizes.filter((s) => s !== selectedSize)
                        : [...values.sizes, selectedSize];

                      setFieldValue("sizes", newSizes);
                    }}
                  />
                </View>
                <View>
                  <ThemedButtonGroup
                    options={["kid", "men", "women", "unisex"]}
                    selectedOptions={[values.gender]}
                    onSelect={(option) => setFieldValue("gender", option)}
                  />
                </View>
                <View className="mb-10">
                  <ThemedButton
                    text="Guardar"
                    onPress={() => handleSubmit()}
                    icon="save-outline"
                  />
                </View>
              </ThemedView>
            </ThemedView>
          </KeyboardAvoidingView>
        )}
      </Formik>
    </>
  );
}
