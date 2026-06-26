import { ROUTES } from "@/routes/path";

import AdminListPage from "./admin-list/page";
import AuditLogsPage from "./audit-logs/page";
import RoleManagementPage from "./role-management/page";
import UserLogsPage from "./user-logs/page";

export const administrationRoutes = [
  { path: ROUTES.adminList, element: <AdminListPage /> },
  { path: ROUTES.roleManagement, element: <RoleManagementPage /> },
  { path: ROUTES.userLogs, element: <UserLogsPage /> },
  { path: ROUTES.auditLogs, element: <AuditLogsPage /> },
];
