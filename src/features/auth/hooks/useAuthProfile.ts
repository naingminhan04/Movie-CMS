import { useEffect } from "react";

import { getUserProfile } from "../api/profile.api";
import { getRefreshToken } from "@/lib/auth-tokens";

import { useAuthStore } from "../store/auth.store";

/** Loads the authenticated user's profile when tokens are present. */
export const useAuthProfile = (): void => {
  const setUser = useAuthStore((state) => state.setUser);
  const refreshToken = useAuthStore((state) => state.refreshToken);

  useEffect(() => {
    if (!refreshToken && !getRefreshToken()) return;

    getUserProfile()
      .then((response) => {
        setUser(response.data);
      })
      .catch(() => {
        // 401 handling is managed by the axios interceptor.
      });
  }, [setUser, refreshToken]);
};
