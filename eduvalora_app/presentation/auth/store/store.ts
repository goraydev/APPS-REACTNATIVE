import { login } from '@/core/auth/actions/auth-action';
import { User, UserLogin, UserResponse, Usuario } from '@/core/auth/interfaces/user';
import { SecureStorageAdapter } from '@/helpers/adapters/secure-storage';
import { create } from 'zustand';

export type AuthStatus = 'authenticated' | 'unauthenticated' | 'checking';

export interface AuthState {
  newUser: User;
  setNewUser: (newUser: User) => void;
  user: UserResponse | null;
  status: AuthStatus;
  changeStatus: (user: UserResponse) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  status: 'unauthenticated',
  newUser: {
    dni: 0,
    id_faculty: '',
    username: '',
    email: '',
    password: '',
  },
  user: null,
  setNewUser: (payload) => set((state) => ({ newUser: payload })),
  changeStatus: async (user: UserResponse) => {
    if (!user) {
      set({ status: 'unauthenticated', user: null });
      await SecureStorageAdapter.deleteItem('token');
      return false;
    }
    set({ status: 'authenticated', user: user });
    await SecureStorageAdapter.setItem('token', user.token);
    return true;
  },
}));
