import updateCreateProduct from "@/core/products/actions/create-update-product.action";
import { getProductById } from "@/core/products/actions/get-product-by-id.action";
import { Product } from "@/core/products/interfaces/product.interfaces";
import { useCameraStore } from "@/presentation/store/useCameraStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useRef } from "react";
import { Alert } from "react-native";

export default function useProduct(productId: string) {
  const queryClient = useQueryClient();
  const productIdRef = useRef(productId);
  const { clearImages } = useCameraStore();

  const productQueryById = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    staleTime: 1000 * 60 * 60,
  });

  //mutacion
  const productMutation = useMutation({
    mutationFn: async (data: Product) =>
      updateCreateProduct({
        ...data,
        id: productIdRef.current,
      }),
    onSuccess(data: Product) {
      productIdRef.current = data.id;
      clearImages();

      //invalidar product queries
      queryClient.invalidateQueries({
        queryKey: ["products", "infinite"],
      });
      queryClient.invalidateQueries({
        queryKey: ["product", data.id],
      });
      Alert.alert("Producto guardado", `${data.title} guardado exitosamente`);
      setTimeout(() => {
        router.back();
      }, 1000);
    },
  });

  return {
    productQueryById,
    productMutation,
  };
}
