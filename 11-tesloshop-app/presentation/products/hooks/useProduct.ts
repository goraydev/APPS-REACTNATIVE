import { getProductById } from "@/core/products/actions/get-product-by-id.action";
import { useQuery } from "@tanstack/react-query";

export default function useProduct(productId: string) {
  const productQueryById = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    staleTime: 1000 * 60 * 60,
  });

  return {
    productQueryById,
  };
}
