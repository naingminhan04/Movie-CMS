import { ROUTES } from "@/routes/path";

import CastsPage from "./casts/page";
import CategoriesPage from "./categories/page";
import CollectionsPage from "./collections/page";
import GenresPage from "./genres/page";
import VideosListPage from "./list/page";
import RolesPage from "./roles/page";
import ViewCountPage from "./view-count/page";

export const videosRoutes = [
  { path: ROUTES.videosList, element: <VideosListPage /> },
  { path: ROUTES.categories, element: <CategoriesPage /> },
  { path: ROUTES.genres, element: <GenresPage /> },
  { path: ROUTES.casts, element: <CastsPage /> },
  { path: ROUTES.roles, element: <RolesPage /> },
  { path: ROUTES.collections, element: <CollectionsPage /> },
  { path: ROUTES.viewCount, element: <ViewCountPage /> },
];
