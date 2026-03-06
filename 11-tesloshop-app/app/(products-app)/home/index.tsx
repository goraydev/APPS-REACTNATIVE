import ProductList from "@/presentation/products/components/ProductList";
import { useProducts } from "@/presentation/products/hooks/useProducts";
import FAB from "@/presentation/shared/FAB";
import ThemedActivity from "@/presentation/shared/ThemedActivity";
import ThemedHeader from "@/presentation/shared/ThemedHeader";
import ThemedView from "@/presentation/shared/ThemedView";
import { router } from "expo-router";
import React from "react";

export default function HomeScreen() {
  const { productsQuery, loadNextPage } = useProducts();

  if (productsQuery.isLoading) {
    return <ThemedActivity />;
  }

  return (
    <>
      <ThemedHeader title="Productos" />
      <ThemedView padding>
        <ProductList
          products={productsQuery.data?.pages.flatMap((page) => page) ?? []}
          loadNextPage={loadNextPage}
        />
        <FAB
          icon="add-outline"
          onPress={() => router.push("/(products-app)/product/new")}
        />
      </ThemedView>
    </>
  );
}
