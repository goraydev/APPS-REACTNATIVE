import ThemedActivity from "@/presentation/shared/ThemedActivity";
import ThemedButton from "@/presentation/shared/ThemedButton";
import ThemedHeader from "@/presentation/shared/ThemedHeader";
import ThemedText from "@/presentation/shared/ThemedText";
import ThemedView from "@/presentation/shared/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
    Image,
    StyleSheet,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from "react-native";

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [selectedImage, setSelectedImage] = useState<string>();

  if (!permission) {
    // Camera permissions are still loading.
    return <ThemedActivity />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <>
        <ThemedHeader title="Cámara" />
        <ThemedView padding>
          <ThemedText className="mb-4">
            Necesitamos tus permisos para usar la cámara
          </ThemedText>
          <ThemedButton onPress={requestPermission} text="Dar Permisos" />
        </ThemedView>
      </>
    );
  }

  const onShutterButtonPress = async () => {
    if (!cameraRef.current) return;
    const picture = await cameraRef.current.takePictureAsync({
      quality: 0.7,
    });

    console.log(picture.uri);

    if (!picture.uri) return;
    setSelectedImage(picture.uri);
    //Guardar imagen
  };

  const onReturnCancel = () => {
    router.dismiss();
  };
  const onPicturaAccepted = () => {
    console.log("implementar acción");
  };

  const onRetakeImage = () => {
    setSelectedImage(undefined);
  };

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  if (selectedImage) {
    return (
      <View style={styles.container}>
        <ReturnCancelButton onPress={onReturnCancel} />
        <Image source={{ uri: selectedImage }} style={styles.camera} />
        <ConfirmImageButton />
        <RetakeImageButton onPress={onRetakeImage} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFillObject}
        facing={facing}
        zoom={0}
      />
      <ShutterButton onPress={onShutterButtonPress} />
      <FlipCameraButton onPress={toggleCameraFacing} />
      <GalleryButton />
      <ReturnCancelButton onPress={onReturnCancel} />
    </View>
  );
}

//Custom Component
const ShutterButton = ({ onPress = () => {} }) => {
  const dimensions = useWindowDimensions();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.shutterButton,
        {
          position: "absolute",
          bottom: 40,
          left: dimensions.width / 2 - 32,
        },
      ]}
    ></TouchableOpacity>
  );
};

const FlipCameraButton = ({ onPress = () => {} }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.flipCameraButton}>
      <Ionicons name="camera-reverse-outline" size={30} color="white" />
    </TouchableOpacity>
  );
};

const GalleryButton = ({ onPress = () => {} }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.galleryButton}>
      <Ionicons name="image-outline" size={30} color="white" />
    </TouchableOpacity>
  );
};

const ReturnCancelButton = ({ onPress = () => {} }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.returnCancelButton]}>
      <Ionicons name="arrow-back-outline" size={30} color="white" />
    </TouchableOpacity>
  );
};

const ConfirmImageButton = ({ onPress = () => {} }) => {
  const dimensions = useWindowDimensions();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.confirmButton,
        {
          position: "absolute",
          bottom: 40,
          left: dimensions.width / 2 - 32,
        },
      ]}
    >
      <Ionicons name="checkmark-outline" size={30} />
    </TouchableOpacity>
  );
};

const RetakeImageButton = ({ onPress = () => {} }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.flipCameraButton}>
      <Ionicons name="close-outline" size={30} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },

  shutterButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "white",
    borderColor: "#1d4ed8",
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmButton: {
    width: 54,
    height: 54,
    borderRadius: 32,
    backgroundColor: "white",
    borderColor: "#17c007",
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
  },

  flipCameraButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: "#17202A",
    position: "absolute",
    bottom: 40,
    right: 32,
    justifyContent: "center",
    alignItems: "center",
  },

  galleryButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: "#17202A",
    position: "absolute",
    bottom: 40,
    left: 32,
    justifyContent: "center",
    alignItems: "center",
  },

  returnCancelButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: "#17202A",
    position: "absolute",
    top: 40,
    left: 32,
    justifyContent: "center",
    alignItems: "center",
  },
});
