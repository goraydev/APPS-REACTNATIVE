import CardSlide from "@/presentation/components/CardSlide";
import ThemedButton from "@/presentation/shared/ThemedButton";
import { router, useNavigation } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { FlatList, ImageSourcePropType, View } from "react-native";

const SlidesScreen = () => {
  const flatListRef = useRef<FlatList>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [stateScroll, setstateScroll] = useState(false);
  const navigation = useNavigation();

  const onSlideChange = (index: number, items: Slide[]) => {
    setCurrentSlideIndex(index > 0 ? index : 0);
    flatListRef.current?.scrollToIndex({ index, animated: true });
    if (index === items.length - 1) {
      setstateScroll(true);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View className="flex-1">
      <FlatList
        ref={flatListRef}
        data={items}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => <CardSlide {...item} key={item.title} />}
        horizontal
        pagingEnabled
        scrollEnabled={stateScroll}
      />

      {currentSlideIndex === items.length - 1 ? (
        <ThemedButton
          className="absolute right-2 bottom-10 w-[150px]"
          onPress={() => router.dismiss()}
        >
          Finalizar
        </ThemedButton>
      ) : (
        <ThemedButton
          className="absolute right-2 bottom-10 w-[150px]"
          onPress={() => onSlideChange(currentSlideIndex + 1, items)}
        >
          Siguiente
        </ThemedButton>
      )}
    </View>
  );
};
export default SlidesScreen;

interface Slide {
  title: string;
  desc: string;
  img: ImageSourcePropType;
}

const items: Slide[] = [
  {
    title: "Titulo 1",
    desc: "Ea et eu enim fugiat sunt reprehenderit sunt aute quis tempor ipsum cupidatat et.",
    img: require("../../assets/images/slide-1.png"),
  },
  {
    title: "Titulo 2",
    desc: "Anim est quis elit proident magna quis cupidatat curlpa labore Lorem ea. Exercitation mollit velit in aliquip tempor occaecat dolor minim amet dolor enim cillum excepteur. ",
    img: require("../../assets/images/slide-2.png"),
  },
  {
    title: "Titulo 3",
    desc: "Ex amet duis amet nulla. Aliquip ea Lorem ea culpa consequat proident. Nulla tempor esse ad tempor sit amet Lorem. Velit ea labore aute pariatur commodo duis veniam enim.",
    img: require("../../assets/images/slide-3.png"),
  },
  {
    title: "Titulo 4",
    desc: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    img: require("../../assets/images/slide-1.png"),
  },
];
