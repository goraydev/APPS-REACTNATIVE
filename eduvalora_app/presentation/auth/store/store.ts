import { User } from '@/core/auth/interfaces/user';
import { create } from 'zustand';

export interface AuthState {
  newUser: User;
  setNewUser: (newUser: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  newUser: {
    DNI: '',
    id_faculty: '',
    username: '',
    email: '',
    password: '',
  },
  setNewUser: (payload) => set((state) => ({ newUser: payload })),
}));
