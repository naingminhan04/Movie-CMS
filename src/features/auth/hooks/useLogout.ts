import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { logout } from "../api/auth.api";
import { ROUTES } from "@/routes/path";

import { useAuthStore } from "../store/auth.store";

export const useLogout = () => {
  const navigate = useNavigate();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return useCallback(() => {
    logout();
    clearAuth();
    navigate(ROUTES.login, { replace: true });
  }, [clearAuth, navigate]);
};
