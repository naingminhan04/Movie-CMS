import { ROUTES } from "@/routes/path";

import AdsPage from "./ads/page";
import BannersPage from "./banners/page";

export const cmsRoutes = [
  { path: ROUTES.banners, element: <BannersPage /> },
  { path: ROUTES.ads, element: <AdsPage /> },
];
