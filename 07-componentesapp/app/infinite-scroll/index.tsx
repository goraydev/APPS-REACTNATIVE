import { Colors } from "@/constants/Colors";
import FadeInImage from "@/presentation/images/FadeInImage";
import ThemedText from "@/presentation/shared/ThemedText";
import ThemedView from "@/presentation/shared/ThemedView";
import { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const InfiniteScrollScreen = () => {
  const [numbers, setnumbers] = useState([1, 2, 3, 4, 5]);

  const loadMore = () => {
    const newArray = Array.from({ length: 5 }, (_, i) => numbers.length + i);
    setTimeout(() => {
      setnumbers([...numbers, ...newArray]);
    }, 1000);
  };

  return (
    <ThemedView padding>
      <ThemedText type="h1" className="text-center">
        InfiniteScrollScreen usando FlatList
      </ThemedText>
      <FlatList
        data={numbers}
        renderItem={({ item, index }) => <ListItem number={item} />}
        onEndReachedThreshold={0.6}
        onEndReached={loadMore}
        ListFooterComponent={() => (
          <View>
            <ActivityIndicator size={40} color={Colors.light.primary} />
          </View>
        )}
      />
    </ThemedView>
  );
};
export default InfiniteScrollScreen;

interface Props {
  number: number;
}

export const ListItem = ({ number }: Props) => {
  return (
    <FadeInImage
      uri={`https://picsum.photos/id/${number}/500/400`}
      style={{
        height: 400,
        width: "100%",
      }}
    />
  );
};
