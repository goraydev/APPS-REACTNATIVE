import { PermissionStatus } from "@/infraestructure/interfaces/location";
import { router, usePathname } from "expo-router";
import React, { PropsWithChildren, useEffect } from "react";
import { AppState } from "react-native";
import { usePermissionStore } from "../store/usePermission";

export default function PermissionCheckedProvider({
  children,
}: PropsWithChildren) {
  const { locationStatus, checkLocationPermission } = usePermissionStore();
  const pathname = usePathname();

  useEffect(() => {
    if (locationStatus === PermissionStatus.GRANTED && pathname !== "/map") {
      router.replace("/map");
    } else if (
      locationStatus !== PermissionStatus.CHECKIng &&
      locationStatus !== PermissionStatus.GRANTED &&
      pathname !== "/permissions"
    ) {
      router.replace("/permissions");
    }
  }, [locationStatus, pathname]);

  useEffect(() => {
    checkLocationPermission();
  }, []);

  //estar pendiente cuando el estado de la aplicacion cambia
  useEffect(() => {
    const subscripcion = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active") {
        checkLocationPermission();
      }
    });

    return () => {
      subscripcion.remove();
    };
  }, []);

  return <>{children}</>;
}
