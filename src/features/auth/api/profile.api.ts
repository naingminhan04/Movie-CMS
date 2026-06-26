import api from "@/services/axios";
import { getRefreshToken } from "@/lib/auth-tokens";
import type { ProfileResponse } from "../types/auth";

export const getUserProfile = async (): Promise<ProfileResponse> => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const { data } = await api.request<ProfileResponse>({
    method: "GET",
    url: "/auth/profile",
    data: refreshToken,
    headers: { "Content-Type": "text/plain" },
  });

  return data;
};
