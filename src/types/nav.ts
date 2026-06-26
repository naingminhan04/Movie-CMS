import type { LucideIcon } from "lucide-react";

type NavChild = {
  label: string;
  to: string;
};

type NavLinkItem = {
  type: "link";
  label: string;
  to: string;
  icon: LucideIcon;
};

type NavGroupItem = {
  type: "group";
  label: string;
  icon: LucideIcon;
  prefix: string;
  children: NavChild[];
};

export type NavItem = NavLinkItem | NavGroupItem;