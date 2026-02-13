import { useFocusEffect, useNavigation } from "expo-router";
import React, { useCallback, useEffect } from "react";
import { BackHandler, StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

export default function MapScreen() {
  const navigation = useNavigation();

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

  return (
    <View style={styles.container}>
      <MapView style={styles.container}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: -9.5278,
            longitude: -77.5278,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        />
        <Marker
          coordinate={{
            latitude: -9.5278,
            longitude: -77.5278,
          }}
          title="Tu ubicación"
          description="Estas actualmente aquí"
        />

        {/* -10.766291044411505, -77.76162437174402 */}

        <Marker
          coordinate={{
            latitude: -10.766291044411505,
            longitude: -77.76162437174402,
          }}
          title="Tu playa Visitada"
          description="Hermosa playa"
        />
      </MapView>
    </View>
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
