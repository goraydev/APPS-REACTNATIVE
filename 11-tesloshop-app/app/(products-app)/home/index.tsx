import { useProducts } from "@/presentation/products/hooks/useProducts";
import ThemedActivity from "@/presentation/shared/ThemedActivity";
import ThemedHeader from "@/presentation/shared/ThemedHeader";
import ThemedText from "@/presentation/shared/ThemedText";
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
        <ThemedText>Hola</ThemedText>
      </ThemedView>
    </>
  );
}
