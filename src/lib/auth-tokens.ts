import { useAuthStore } from "@/features/auth/store/auth.store";
import {
  getAccessToken as getAccessTokenFromCookie,
  getRefreshToken as getRefreshTokenFromCookie,
} from "@/lib/cookies";

/** Resolves the access token from cookies or the persisted auth store. */
export const getAccessToken = (): string | undefined =>
  getAccessTokenFromCookie() ?? useAuthStore.getState().accessToken ?? undefined;

/** Resolves the refresh token from cookies or the persisted auth store. */
export const getRefreshToken = (): string | undefined =>
  getRefreshTokenFromCookie() ?? useAuthStore.getState().refreshToken ?? undefined;
