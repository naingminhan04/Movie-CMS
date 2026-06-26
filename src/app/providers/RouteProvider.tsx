import { RouterProvider } from "react-router-dom";

import { router } from "@/routes";

const RouteProvider = () => {
  return <RouterProvider router={router} />;
};

export default RouteProvider;
