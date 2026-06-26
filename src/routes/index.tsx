import { createBrowserRouter, Navigate } from "react-router-dom";

import MainLayout from "@/app/layouts/MainLayout";
import PageFrame from "@/app/layouts/PageFrame";
import { administrationRoutes } from "@/features/administration/routes";
import AnnouncementsPage from "@/features/announcements/page";
import AuthPage from "@/features/auth/page";
import ForgotPasswordPage from "@/features/auth/pages/ForgotPasswordPage";
import OtpVerificationPage from "@/features/auth/pages/OtpVerificationPage";
import ResetPasswordPage from "@/features/auth/pages/ResetPasswordPage";
import { cmsRoutes } from "@/features/cms/routes";
import { customersRoutes } from "@/features/customers/routes";
import Dashboard from "@/features/dashboard/page";
import ProgramsPage from "@/features/programs/page";
import { reportingRoutes } from "@/features/reporting/routes";
import { settingsRoutes } from "@/features/settings/routes";
import { subscriptionRoutes } from "@/features/subscription/routes";
import TransactionsPage from "@/features/transactions/page";
import { videosRoutes } from "@/features/videos/routes";

import { ROUTES } from "./path";
import ProtectedRoutes from "./protected-routes";
import PublicRoutes from "./public-routes";

const featureRoutes = [
  ...videosRoutes,
  { path: ROUTES.programs, element: <ProgramsPage /> },
  ...cmsRoutes,
  ...customersRoutes,
  ...subscriptionRoutes,
  { path: ROUTES.transactions, element: <TransactionsPage /> },
  { path: ROUTES.announcements, element: <AnnouncementsPage /> },
  ...reportingRoutes,
  ...administrationRoutes,
  ...settingsRoutes,
];

export const router = createBrowserRouter([
   {
    element: <PublicRoutes />,
    children: [
      {
        path: ROUTES.auth,
        element: <AuthPage />,
      },
      {
        path: ROUTES.login,
        element: <AuthPage />,
      },
      {
        path: ROUTES.forgotPassword,
        element: <ForgotPasswordPage />,
      },
      {
        path: ROUTES.otpVerification,
        element: <OtpVerificationPage />,
      },
      {
        path: ROUTES.resetPassword,
        element: <ResetPasswordPage />,
      },
    ],
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            element: <PageFrame />,
            children: [
              {
                path: ROUTES.dashboard,
                element: <Dashboard />,
              },
              ...featureRoutes,
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={ROUTES.dashboard} replace />,
  },
]);
