import { API_URL, productsApi } from "@/core/api/productsApi";
import { Gender, Product } from "../interfaces/product.interfaces";

const emptyProduct: Product = {
  id: "",
  title: "",
  description: "",
  price: 0,
  stock: 0,
  images: [],
  gender: Gender.Men,
  sizes: [],
  slug: "",
  tags: [],
};
export const getProductById = async (id: string): Promise<Product> => {
  if (id === "new") return emptyProduct;
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
