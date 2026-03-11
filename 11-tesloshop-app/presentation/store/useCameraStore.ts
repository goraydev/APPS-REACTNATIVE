import { create } from "zustand";

interface TermporalCameraStoreState {
  selectedImages: string[];
  addSelectedImage: (image: string) => void;
  addSelectedImages: (images: string[]) => void;
  clearImages: () => void;
}

export const useCameraStore = create<TermporalCameraStoreState>((set) => ({
  selectedImages: [],
  addSelectedImage: (image: string) => {
    set((state) => ({ selectedImages: [...state.selectedImages, image] }));
  },
  clearImages: () => set({ selectedImages: [] }),
  addSelectedImages: (images: string[]) => {
    set((state) => ({
      selectedImages: [...state.selectedImages, ...images],
    }));
  },
}));
