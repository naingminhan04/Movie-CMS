import { ROUTES } from "@/routes/path";

import LicensedVideosPage from "./licensed-videos/page";
import ProgramAnalyticsPage from "./program-analytics/page";
import VideoAnalyticsPage from "./video-analytics/page";

export const reportingRoutes = [
  { path: ROUTES.videoAnalytics, element: <VideoAnalyticsPage /> },
  { path: ROUTES.programAnalytics, element: <ProgramAnalyticsPage /> },
  { path: ROUTES.licensedVideos, element: <LicensedVideosPage /> },
];
