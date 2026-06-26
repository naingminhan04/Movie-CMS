import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { AuthTokens, User } from "../types/auth";

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  accessTokenExpiresAt: string | null;
  refreshTokenExpiresAt: string | null;
  user: User | null;
  setAuth: (data: AuthTokens) => void;
  setUser: (user: User) => void;
  updateAccessToken: (
    accessToken: string,
    accessTokenExpiresAt: string,
  ) => void;
  clearAuth: () => void;
};

const initialState = {
  accessToken: null,
  refreshToken: null,
  accessTokenExpiresAt: null,
  refreshTokenExpiresAt: null,
  user: null,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...initialState,
      setAuth: (data) =>
        set({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          accessTokenExpiresAt: data.accessTokenExpiresAt,
          refreshTokenExpiresAt: data.refreshTokenExpiresAt,
        }),
      setUser: (user) => set({ user }),
      updateAccessToken: (accessToken, accessTokenExpiresAt) =>
        set({
          accessToken,
          accessTokenExpiresAt,
        }),
      clearAuth: () => set(initialState),
    }),
    {
      name: "origin-admin-auth",
    },
  ),
);
