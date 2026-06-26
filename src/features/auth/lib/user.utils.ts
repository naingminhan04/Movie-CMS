import type { User } from "../types/auth";

export const getUserDisplayName = (user: User | null): string => {
  if (!user) return "User";

  return user.fullName || user.email || "User";
};

export const getUserRoleName = (user: User | null): string => {
  if (!user) return "User";

  return user.role?.name ?? "User";
};

export const getUserAvatarUrl = (user: User | null): string | null => {
  if (!user) return null;

  return user.profileImageUrl;
};

export const getUserInitials = (name: string): string => {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return initials || "U";
};
