import Cookies from "js-cookie";

export const COOKIE_KEYS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
} as const;

const DEFAULT_COOKIE_OPTIONS = {
  secure: true,
  sameSite: "strict" as const,
};

/** Converts backend expiry values (ISO date or ms duration) for js-cookie. */
export const resolveCookieExpiry = (expiresAt: string | number): number | Date => {
  const numeric = Number(expiresAt);

  if (Number.isFinite(numeric) && numeric > 0 && numeric < 1_000_000_000_000) {
    return numeric / (1000 * 60 * 60 * 24);
  }

  const date = new Date(expiresAt);
  if (!Number.isNaN(date.getTime())) {
    return date;
  }

  return 7;
};

export const getAccessToken = (): string | undefined =>
  Cookies.get(COOKIE_KEYS.ACCESS_TOKEN);

export const getRefreshToken = (): string | undefined =>
  Cookies.get(COOKIE_KEYS.REFRESH_TOKEN);

export const setAccessTokenCookie = (
  accessToken: string,
  accessTokenExpiresAt: string | number,
): void => {
  Cookies.set(COOKIE_KEYS.ACCESS_TOKEN, accessToken, {
    ...DEFAULT_COOKIE_OPTIONS,
    expires: resolveCookieExpiry(accessTokenExpiresAt),
  });
};

export const saveAuthCookies = (tokens: {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: string | number;
  refreshTokenExpiresAt: string | number;
}): void => {
  setAccessTokenCookie(tokens.accessToken, tokens.accessTokenExpiresAt);

  Cookies.set(COOKIE_KEYS.REFRESH_TOKEN, tokens.refreshToken, {
    ...DEFAULT_COOKIE_OPTIONS,
    expires: resolveCookieExpiry(tokens.refreshTokenExpiresAt),
  });
};

export const clearAuthCookies = (): void => {
  Cookies.remove(COOKIE_KEYS.ACCESS_TOKEN);
  Cookies.remove(COOKIE_KEYS.REFRESH_TOKEN);
};
