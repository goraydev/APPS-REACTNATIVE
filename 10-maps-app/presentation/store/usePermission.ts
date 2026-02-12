import {
  checkLocationPermission,
  requestLocationPermission,
} from "@/constants/permissions/locations";
import { PermissionStatus } from "@/infraestructure/interfaces/location";
import { create } from "zustand";

type PermissionState = {
  locationStatus: PermissionStatus;
  requestLocationPermission: () => Promise<PermissionStatus>;
  checkLocationPermission: () => Promise<PermissionStatus>;
};

export const usePermissionStore = create<PermissionState>()((set) => ({
  locationStatus: PermissionStatus.CHECKIng,

  requestLocationPermission: async () => {
    const status = await requestLocationPermission();
    set({ locationStatus: status });

    return status;
  },

  checkLocationPermission: async () => {
    const status = await checkLocationPermission();
    set({ locationStatus: status });
    return status;
  },
}));
