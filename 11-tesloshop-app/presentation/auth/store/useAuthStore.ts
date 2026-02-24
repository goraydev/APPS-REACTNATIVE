import {
  authCheckAuthStatus,
  authLogin,
  authRegister,
} from "@/core/auth/actions/auth-action";
import { User } from "@/core/auth/interfaces/user";
import { SecureStorageAdapter } from "@/helpers/adapters/secure-storage";
import { create } from "zustand";

export type AuthStatus = "authenticated" | "unauthenticated" | "checking";

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;
  messageBackend?: string;
  login: (email: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
  changeStatus: (token?: string, user?: User) => Promise<boolean>;
  register: (
    email: string,
    password: string,
    fullName: string,
  ) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  status: "checking",
  token: undefined,
  user: undefined,
  messageBackend: undefined,
  changeStatus: async (token?: string, user?: User) => {
    if (!token || !user) {
      set({ status: "unauthenticated", token: undefined, user: undefined });
      await SecureStorageAdapter.deleteItem("token");
      return false;
    }

    set({
      status: "authenticated",
      token: token,
      user: user,
    });
    await SecureStorageAdapter.setItem("token", token);
    return true;
  },

  login: async (email: string, password: string) => {
    const resp = await authLogin(email, password);
    return get().changeStatus(resp?.token, resp?.user);
  },

  checkStatus: async () => {
    const resp = await authCheckAuthStatus();

    get().changeStatus(resp?.token, resp?.user);
  },
  logout: async () => {
    //clear tokenb del storage
    await SecureStorageAdapter.deleteItem("token");
    set({
      status: "unauthenticated",
      token: undefined,
      user: undefined,
    });
  },
  register: async (email: string, password: string, fullName: string) => {
    const resp = await authRegister(email, password, fullName);

    if (!resp?.token) {
      set({ messageBackend: resp });
      return false;
    }
    set({ messageBackend: undefined });
    return get().changeStatus(resp?.token, resp?.user);
  },
}));
