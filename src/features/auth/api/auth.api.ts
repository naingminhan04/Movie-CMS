import axios from "axios";

import { getRefreshToken } from "@/lib/auth-tokens";
import {
  clearAuthCookies,
  saveAuthCookies,
  setAccessTokenCookie,
} from "@/lib/cookies";
import type {
  LoginRequest,
  LoginResponse,
  RefreshRequest,
  RefreshResponse,
} from "../types/auth";

const API_BASE_URL = import.meta.env.VITE_API_URL;

/**
 * Plain Axios client for auth endpoints.
 * Intentionally separate from the authenticated instance to avoid interceptor recursion.
 */
const authClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15_000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const adminLogin = async (
  payload: LoginRequest,
): Promise<LoginResponse> => {
  const { data } = await authClient.post<LoginResponse>(
    "/auth/admin-login",
    payload,
  );

  saveAuthCookies({
    accessToken: data.data.accessToken,
    refreshToken: data.data.refreshToken,
    accessTokenExpiresAt: data.data.accessTokenExpiresAt,
    refreshTokenExpiresAt: data.data.refreshTokenExpiresAt,
  });

  return data;
};

export const refreshAccessToken = async (): Promise<RefreshResponse> => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const body: RefreshRequest = { refreshToken };

  const { data } = await authClient.post<RefreshResponse>(
    "/auth/refresh",
    body,
  );

  setAccessTokenCookie(data.data.accessToken, data.data.accessTokenExpiresAt);

  return data;
};

export const logout = (): void => {
  clearAuthCookies();
};
