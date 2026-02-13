import * as Location from "expo-location";

import { LatLng } from "@/core/infraestructure/interfaces/lat-ln";

export const getCurrentLocation = async (): Promise<LatLng> => {
  try {
    const { coords } = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });

    return {
      latitude: coords.latitude,
      longitude: coords.longitude,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener la ubicación actual");
  }
};

export const watchCurrentPosition = (
  locationCallback: (location: LatLng) => void,
) => {
  return Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.High,
      distanceInterval: 10,
    },
    ({ coords }) => {
      locationCallback({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    },
  );
};
