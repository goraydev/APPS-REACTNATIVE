import { API_URL, productsApi } from "@/core/api/productsApi";
import { Product } from "../interfaces/product.interfaces";

export const getProductById = async (id: string): Promise<Product> => {
  try {
    const { data } = await productsApi.get<Product>(`/products/${id}`);

    return {
      ...data,
      images: data.images.map((image) => `${API_URL}/files/product/${image}`),
    };
  } catch (error) {
    throw new Error(`Error al obtener producto ${id}`);
  }
};
