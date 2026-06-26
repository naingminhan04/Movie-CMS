import { ROUTES } from "@/routes/path";

import BanListPage from "./ban-list/page";
import CustomerListPage from "./list/page";

export const customersRoutes = [
  { path: ROUTES.customerList, element: <CustomerListPage /> },
  { path: ROUTES.banList, element: <BanListPage /> },
];
