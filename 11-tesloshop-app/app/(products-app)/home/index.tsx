import ProductList from "@/presentation/products/components/ProductList";
import { useProducts } from "@/presentation/products/hooks/useProducts";
import ThemedActivity from "@/presentation/shared/ThemedActivity";
import ThemedHeader from "@/presentation/shared/ThemedHeader";
import ThemedView from "@/presentation/shared/ThemedView";
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
      </ThemedView>
    </>
  );
}
