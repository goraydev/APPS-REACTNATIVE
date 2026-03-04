import { getProductById } from "@/core/products/actions/get-product-by-id.action";
import { getProducts } from "@/core/products/actions/get-products.actions";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const useProducts = () => {
  const productsQuery = useInfiniteQuery({
    queryKey: ["products", "infinite"],
    queryFn: ({ pageParam }) => getProducts(20, pageParam * 20),
    staleTime: 1000 * 60 * 60,
    initialPageParam: 0,
    getNextPageParam: (laastPage, allPages) => allPages.length,
  });

  const productQueryById = (id: string) => {
    useQuery({
      queryKey: ["product", "byId"],
      queryFn: () => getProductById(id),
    });
  };

  return {
    productsQuery,
    productQueryById,

    //methos
    loadNextPage: productsQuery.fetchNextPage,
  };
};
