import {
  getCurrentLocation,
  watchCurrentPosition,
} from "@/constants/location/location";
import { LatLng } from "@/core/infraestructure/interfaces/lat-ln";
import { LocationSubscription } from "expo-location";
import { create } from "zustand";

interface LocationState {
  lastKnowLocation: LatLng | null;
  userLocationList: LatLng[];
  watchSubscriptionId: LocationSubscription | null;
  getLocation: () => Promise<LatLng>;
  watchLocation: () => void;
  clearWatchLocation: () => void;
}

export const useLocationStore = create<LocationState>()((set, get) => ({
  lastKnowLocation: null,
  userLocationList: [],
  watchSubscriptionId: null,

  getLocation: async () => {
    const location = await getCurrentLocation();
    set({ lastKnowLocation: location });
    return location;
  },

  watchLocation: async () => {
    const oldSubscription = get().watchSubscriptionId;
    if (oldSubscription !== null) {
      get().clearWatchLocation();
    }

    const watchSubscription = await watchCurrentPosition((latlng) => {
      set({
        lastKnowLocation: latlng,
        userLocationList: [...get().userLocationList, latlng],
      });
    });

    set({
      watchSubscriptionId: watchSubscription,
    });
  },

  clearWatchLocation: () => {
    const subscription = get().watchSubscriptionId;
    if (subscription !== null) {
      subscription.remove();
    }
  },
}));
