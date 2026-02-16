import { create } from "zustand";
type Store = {
  theme: "light" | "dark" | "system";
  toggleTheme: (theme?: "light" | "dark" | "system") => void;
};

export const useThemeStore = create<Store>((set) => ({
  theme: "light",
  toggleTheme: (theme) => {
    if (theme) {
      set(() => ({ theme }));
      return;
    }

    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    }));
  },
}));
