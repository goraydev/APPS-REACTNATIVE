import { getProductById } from "@/core/products/actions/get-product-by-id.action";
import { Product } from "@/core/products/interfaces/product.interfaces";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Alert } from "react-native";

export default function useProduct(productId: string) {
  const productQueryById = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    staleTime: 1000 * 60 * 60,
  });

  //mutacion
  const productMutation = useMutation({
    mutationFn: async (data: Product) => {
      //disparar la accionde guardar
      console.log(data);
      return data;
    },

    onSuccess(data: Product) {
      //invalidar product queries
      Alert.alert("Producto guardado", `${data.title} guardado exitosamente`);
    },
  });

  return {
    productQueryById,
    productMutation,
  };
}
