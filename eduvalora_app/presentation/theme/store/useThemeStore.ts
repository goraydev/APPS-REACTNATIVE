import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
type Store = {
  theme: 'light' | 'dark' | 'system';
  toggleTheme: (theme?: 'light' | 'dark' | 'system') => void;
};

export const useThemeStore = create<Store>((set) => ({
  theme: 'system',
  toggleTheme: (theme) => {
    if (theme) {
      set(() => ({ theme }));
      AsyncStorage.setItem('select-theme', theme);
      return;
    }

    set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      AsyncStorage.setItem('select-theme', newTheme);
      return { theme: newTheme };
    });
  },
}));
