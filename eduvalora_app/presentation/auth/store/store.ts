import { authCheckStatus, login } from '@/core/auth/actions/auth-action';
import { User, UserLogin, UserResponse, Usuario } from '@/core/auth/interfaces/user';
import { SecureStorageAdapter } from '@/helpers/adapters/secure-storage';
import { create } from 'zustand';

export type AuthStatus = 'authenticated' | 'unauthenticated' | 'checking';

export interface AuthState {
  newUser: User;
  setNewUser: (newUser: User) => void;
  user: Usuario | null;
  setUser: (user: Usuario | null) => void;
  status: AuthStatus;
  changeStatus: (user: UserResponse) => Promise<boolean>;
  logout: () => Promise<void>;
  checkStatus: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  status: 'checking',
  newUser: {
    dni: 0,
    id_faculty: '',
    username: '',
    email: '',
    password: '',
  },
  user: null,
  setNewUser: (payload) => set((state) => ({ newUser: payload })),
  setUser: (payload) => set((state) => ({ user: payload })),
  changeStatus: async (user: UserResponse) => {
    if (!user) {
      set({ status: 'unauthenticated', user: undefined });
      await SecureStorageAdapter.deleteItem('token');
      return false;
    }

    await SecureStorageAdapter.setItem('token', user.token);

    set({ status: 'authenticated', user: user.usuario });
    return true;
  },
  logout: async () => {
    await SecureStorageAdapter.deleteItem('token');
    set({ status: 'unauthenticated', user: null });
  },
  checkStatus: async () => {
    const resp = await authCheckStatus();

    if (!resp) {
      set({ status: 'unauthenticated', user: null });
      await SecureStorageAdapter.deleteItem('token');
      return;
    }

    /* if (!resp.usuario) {
      const currentUser = get().user;
      if (currentUser?.usuario) {
        await get().changeStatus({ ...currentUser, ...resp });
        return;
      }
    } */

    await get().changeStatus(resp);
  },
}));
