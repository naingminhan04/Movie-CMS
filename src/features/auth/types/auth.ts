export type PermissionAction = "CREATE" | "READ" | "UPDATE" | "DELETE";

export interface PermissionModule {
  id: string;
  name: string;
  code: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Permission {
  id: string;
  moduleId: string;
  action: PermissionAction;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  module: PermissionModule;
}

export interface RolePermission {
  roleId: string;
  permissionId: string;
  permission: Permission;
}

export interface UserRole {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  rolePermissions: RolePermission[];
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  profileImageUrl: string | null;
  roleId: string;
  isBanned: boolean;
  twoFactorEnabled: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  lastLoginAt: string;
  role: UserRole;
  subjectType: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: string;
    refreshTokenExpiresAt: string;
    user: Pick<User, "id">;
  };
}

export interface RefreshRequest {
  refreshToken: string;
}

export interface RefreshResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    accessTokenExpiresAt: string;
    user: Pick<User, "id">;
  };
}

export interface ProfileResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: User;
  apiVersion?: string;
  timestamp?: string;
}

export type AuthTokens = LoginResponse["data"];

// ── Password Reset ────────────────────────────────────────────────────────────

export interface ForgotPasswordRequest {
  email: string;
  userType: "ADMIN";
}

export interface ForgotPasswordResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    userId: string;
  };
}

export interface VerifyOtpRequest {
  userId: string;
  code: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
  };
}

export interface ResetPasswordRequest {
  accessToken: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  statusCode: number;
  message: string;
}
