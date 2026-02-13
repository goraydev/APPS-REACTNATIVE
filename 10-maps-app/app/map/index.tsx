import CustomMap from "@/presentation/components/maps/CustomMap";
import { useLocationStore } from "@/presentation/store/useLocation";
import { useFocusEffect, useNavigation } from "expo-router";
import React, { useCallback, useEffect } from "react";
import { ActivityIndicator, BackHandler, StyleSheet, View } from "react-native";

export default function MapScreen() {
  const navigation = useNavigation();
  const { lastKnowLocation, getLocation } = useLocationStore();

  useEffect(() => {
    if (lastKnowLocation === null) {
      getLocation();
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        return true;
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress,
      );

      return () => subscription.remove();
    }, []),
  );

  useEffect(() => {
    navigation.setOptions({
      title: "Google Mapa",
    });
  }, []);

  if (lastKnowLocation === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={30} color="blue" />
      </View>
    );
  }

  return (
    <>
      <CustomMap initialLocation={lastKnowLocation} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
