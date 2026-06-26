import { ROUTES } from "@/routes/path";

import PackagesPage from "./packages/page";
import PromotionsPage from "./promotions/page";

export const subscriptionRoutes = [
  { path: ROUTES.packages, element: <PackagesPage /> },
  { path: ROUTES.promotions, element: <PromotionsPage /> },
];
