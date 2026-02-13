import { LatLng } from "@/core/infraestructure/interfaces/lat-ln";
import { useLocationStore } from "@/presentation/store/useLocation";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import FAB from "../shared/FAB";

interface Props {
  showUserLocation?: boolean;
  initialLocation: LatLng;
}
export default function CustomMap({
  initialLocation,
  showUserLocation = true,
  ...rest
}: Props) {
  const mapRef = useRef<MapView>(null);
  const [isFolloWingUser, setIsFolloWingUser] = useState(true);
  const [isShowPath, setIsShowPath] = useState(true);
  const {
    watchLocation,
    clearWatchLocation,
    lastKnowLocation,
    getLocation,
    userLocationList,
  } = useLocationStore();

  useEffect(() => {
    watchLocation();

    return () => {
      clearWatchLocation();
    };
  }, []);

  const movCameraToLocation = (latlng: LatLng) => {
    if (!mapRef.current) return;

    mapRef.current.animateCamera({
      center: latlng,
      zoom: 15,
    });
  };

  const movetoCurrentLocation = async () => {
    if (!lastKnowLocation) {
      movCameraToLocation(initialLocation);
    } else {
      movCameraToLocation(lastKnowLocation);
    }
    const location = await getLocation();
    if (!location) return;
    movCameraToLocation(location);
  };

  useEffect(() => {
    if (lastKnowLocation && isFolloWingUser) {
      movCameraToLocation(lastKnowLocation);
    }
  }, [lastKnowLocation, isFolloWingUser]);

  return (
    <View {...rest}>
      <MapView
        ref={mapRef}
        onTouchStart={() => setIsFolloWingUser(false)}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={showUserLocation}
        initialRegion={{
          latitude: initialLocation.latitude,
          longitude: initialLocation.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        {isShowPath && (
          <Polyline coordinates={userLocationList} strokeColor="green" />
        )}
      </MapView>
      <FAB
        onPress={() => setIsShowPath(!isShowPath)}
        iconName={isShowPath ? "trending-up" : "analytics"}
        style={{
          bottom: 140,
        }}
      />
      <FAB
        onPress={() => setIsFolloWingUser(!isFolloWingUser)}
        iconName={isFolloWingUser ? "walk" : "accessibility"}
        style={{
          bottom: 80,
        }}
      />
      <FAB onPress={movetoCurrentLocation} iconName="compass" />
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
