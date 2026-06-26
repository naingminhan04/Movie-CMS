import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "@/features/auth/store/auth.store";
import { getAccessToken } from "@/lib/auth-tokens";

import { ROUTES } from "./path";

const ProtectedRoutes = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const isAuthenticated = Boolean(accessToken ?? getAccessToken());

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
