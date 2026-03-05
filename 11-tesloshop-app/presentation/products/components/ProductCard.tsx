import { Product } from "@/core/products/interfaces/product.interfaces";
import ThemedText from "@/presentation/shared/ThemedText";
import ThemedView from "@/presentation/shared/ThemedView";
import { router } from "expo-router";
import { Image, TouchableOpacity } from "react-native";

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  return (
    <ThemedView>
      <TouchableOpacity
        onPress={() => router.push(`/product/${product.id}`)}
        className="mb-2 mr-2"
      >
        {product.images.length === 0 ? (
          <Image
            source={require("../../../assets/images/no-product-image.png")}
            style={{ width: "100%", height: 200, borderRadius: 10 }}
          />
        ) : (
          <Image
            source={{ uri: product.images[0] }}
            style={{ flex: 1, height: 200, width: "100%", borderRadius: 10 }}
          />
        )}

        <ThemedText numberOfLines={2} style={{ textAlign: "center" }}>
          {product.title}
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};
