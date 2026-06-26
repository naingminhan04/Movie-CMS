import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

import { ROUTES } from "./path";

const PublicRoutes = () => {
  const accessToken = Cookies.get("access_token");

  if (accessToken) {
    return <Navigate to={ROUTES.dashboard} replace />;
  }

  return <Outlet />;
};

export default PublicRoutes;