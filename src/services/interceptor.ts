import type {
    AxiosError,
    AxiosInstance,
    InternalAxiosRequestConfig,
  } from "axios";
  
  import { refreshAccessToken } from "@/features/auth/api/auth.api";
  import { useAuthStore } from "@/features/auth/store/auth.store";
  import { getRefreshToken } from "@/lib/auth-tokens";
  import { clearAuthCookies } from "@/lib/cookies";
  
  const LOGIN_PATH = "/login";
  
  type RetryableRequestConfig = InternalAxiosRequestConfig & {
    _retry?: boolean;
  };
  
  type QueueEntry = {
    resolve: (accessToken: string) => void;
    reject: (error: unknown) => void;
  };
  
  let isRefreshing = false;
  let failedQueue: QueueEntry[] = [];
  
  const processQueue = (error: unknown, accessToken: string | null = null): void => {
    failedQueue.forEach(({ resolve, reject }) => {
      if (error || !accessToken) {
        reject(error ?? new Error("Token refresh failed"));
        return;
      }
  
      resolve(accessToken);
    });
  
    failedQueue = [];
  };
  
  const handleAuthFailure = (): void => {
    clearAuthCookies();
    useAuthStore.getState().clearAuth();
  
    if (window.location.pathname !== LOGIN_PATH) {
      window.location.assign(LOGIN_PATH);
    }
  };
  
  const enqueueRequestRetry = (
    api: AxiosInstance,
    originalRequest: RetryableRequestConfig,
  ): Promise<unknown> =>
    new Promise((resolve, reject) => {
      failedQueue.push({
        resolve: (accessToken: string) => {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          resolve(api(originalRequest));
        },
        reject,
      });
    });
  
  const AUTH_PATHS_WITHOUT_REFRESH = ["/auth/admin-login", "/auth/refresh"];
  
  export const setupResponseInterceptor = (api: AxiosInstance): void => {
    api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as RetryableRequestConfig | undefined;
  
        if (
          error.response?.status !== 401 ||
          !originalRequest ||
          originalRequest._retry
        ) {
          return Promise.reject(error);
        }
  
        if (
          AUTH_PATHS_WITHOUT_REFRESH.some((path) =>
            originalRequest.url?.includes(path),
          )
        ) {
          return Promise.reject(error);
        }
  
        if (isRefreshing) {
          return enqueueRequestRetry(api, originalRequest);
        }
  
        originalRequest._retry = true;
        isRefreshing = true;
  
        const refreshToken = getRefreshToken();
  
        if (!refreshToken) {
          isRefreshing = false;
          handleAuthFailure();
          return Promise.reject(error);
        }
  
        try {
          const { data } = await refreshAccessToken();
  
          useAuthStore.getState().updateAccessToken(
            data.accessToken,
            data.accessTokenExpiresAt,
          );
  
          processQueue(null, data.accessToken);
  
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          handleAuthFailure();
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      },
    );
  };
  