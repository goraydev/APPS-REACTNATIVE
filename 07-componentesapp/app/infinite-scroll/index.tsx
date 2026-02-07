import { Colors } from "@/constants/Colors";
import FadeInImage from "@/presentation/images/FadeInImage";
import ThemedText from "@/presentation/shared/ThemedText";
import ThemedTextnput from "@/presentation/shared/ThemedTextnput";
import { BlurView } from "expo-blur";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  View,
} from "react-native";

const InfiniteScrollScreen = () => {
  const [numbers, setnumbers] = useState([1, 2, 3, 4, 5]);
  const [text, settext] = useState("");

  const loadMore = () => {
    const newArray = Array.from({ length: 5 }, (_, i) => numbers.length + i);
    setTimeout(() => {
      setnumbers([...numbers, ...newArray]);
    }, 1000);
  };

  return (
    <KeyboardAvoidingView className="flex-1" behavior="position">
      <ThemedText type="h1" className="text-center">
        InfiniteScrollScreen usando FlatList
      </ThemedText>
      <FlatList
        data={numbers}
        renderItem={({ item, index }) => <ListItem number={item} />}
        onEndReachedThreshold={0.6}
        onEndReached={loadMore}
        keyboardDismissMode="on-drag"
        contentInsetAdjustmentBehavior="automatic"
        ListFooterComponent={() => (
          <View>
            <ActivityIndicator size={40} color={Colors.light.primary} />
          </View>
        )}
      />
      {/* <View style={{ marginBottom: 100 }} /> */}
      <KeyboardAvoidingView>
        <View className="flex-1 absolute w-full h-52 bottom-10 p-8 bg-black/15">
          <BlurView intensity={60}>
            <ThemedTextnput
              onChangeText={settext}
              inputMode="search"
              className="p-4"
            />
          </BlurView>
        </View>
      </KeyboardAvoidingView>
    </KeyboardAvoidingView>
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
