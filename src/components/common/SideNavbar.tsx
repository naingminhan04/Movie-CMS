import {
  BarChart3,
  ChevronDown,
  Clapperboard,
  Gem,
  LayoutDashboard,
  LogOut,
  Megaphone,
  MonitorPlay,
  Search,
  Settings,
  Shield,
  Tv,
  Users,
  WalletCards,
} from "lucide-react";
import type {NavItem } from "@/types/nav";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { ROUTE_GROUPS, ROUTES } from "@/routes/path";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useLogout } from "@/features/auth/hooks/useLogout";
import {
  getUserAvatarUrl,
  getUserDisplayName,
  getUserInitials,
  getUserRoleName,
} from "@/features/auth/lib/user.utils";

const navItems: NavItem[] = [
  {
    type: "link",
    label: "Dashboard",
    to: ROUTES.dashboard,
    icon: LayoutDashboard,
  },
  {
    type: "group",
    label: "Videos",
    icon: Clapperboard,
    prefix: ROUTE_GROUPS.videos,
    children: [
      { label: "Videos List", to: ROUTES.videosList },
      { label: "Categories", to: ROUTES.categories },
      { label: "Genres", to: ROUTES.genres },
      { label: "Casts", to: ROUTES.casts },
      { label: "Roles", to: ROUTES.roles },
      { label: "Collections", to: ROUTES.collections },
      { label: "View Count", to: ROUTES.viewCount },
    ],
  },
  {
    type: "link",
    label: "Programs",
    to: ROUTES.programs,
    icon: Tv,
  },
  {
    type: "group",
    label: "CMS",
    icon: MonitorPlay,
    prefix: ROUTE_GROUPS.cms,
    children: [
      { label: "Banners", to: ROUTES.banners },
      { label: "Ads", to: ROUTES.ads },
    ],
  },
  {
    type: "group",
    label: "Customers",
    icon: Users,
    prefix: ROUTE_GROUPS.customers,
    children: [
      { label: "Customer List", to: ROUTES.customerList },
      { label: "Ban List", to: ROUTES.banList },
    ],
  },
  {
    type: "group",
    label: "Subscription",
    icon: Gem,
    prefix: ROUTE_GROUPS.subscription,
    children: [
      { label: "Packages", to: ROUTES.packages },
      { label: "Promotions", to: ROUTES.promotions },
    ],
  },
  {
    type: "link",
    label: "Transaction",
    to: ROUTES.transactions,
    icon: WalletCards,
  },
  {
    type: "link",
    label: "Announcements",
    to: ROUTES.announcements,
    icon: Megaphone,
  },
  {
    type: "group",
    label: "Reporting",
    icon: BarChart3,
    prefix: ROUTE_GROUPS.reporting,
    children: [
      { label: "Video Analytics", to: ROUTES.videoAnalytics },
      { label: "Program Analytics", to: ROUTES.programAnalytics },
      { label: "Licensed Videos", to: ROUTES.licensedVideos },
    ],
  },
  {
    type: "group",
    label: "Administration",
    icon: Shield,
    prefix: ROUTE_GROUPS.administration,
    children: [
      { label: "Admin List", to: ROUTES.adminList },
      { label: "Role Management", to: ROUTES.roleManagement },
      { label: "User Logs", to: ROUTES.userLogs },
      { label: "Audit Logs", to: ROUTES.auditLogs },
    ],
  },
  {
    type: "group",
    label: "Setting",
    icon: Settings,
    prefix: ROUTE_GROUPS.settings,
    children: [
      { label: "Reminders", to: ROUTES.reminders },
      { label: "SMTP", to: ROUTES.smtp },
      { label: "FAQs", to: ROUTES.faqs },
      { label: "Terms & Conditions", to: ROUTES.termAndConditions },
      { label: "Privacy Policy", to: ROUTES.privacyAndPolicy },
    ],
  },
];

const SideNavbar = () => {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const handleLogout = useLogout();

  const displayName = getUserDisplayName(user);
  const roleName = getUserRoleName(user);
  const avatarUrl = getUserAvatarUrl(user);
  const initials = getUserInitials(displayName);

  const activeGroup = navItems.find(
    (item) =>
      item.type === "group" && location.pathname.startsWith(item.prefix),
  );
  const activeGroupLabel = activeGroup?.label ?? null;
  const [groupState, setGroupState] = useState<{
    manualOpenGroup: string | null;
    closedActiveGroup: string | null;
  }>({
    manualOpenGroup: null,
    closedActiveGroup: null,
  });
  const openGroup =
    groupState.manualOpenGroup ??
    (activeGroupLabel && groupState.closedActiveGroup !== activeGroupLabel
      ? activeGroupLabel
      : null);

  return (
    <aside className="flex h-screen w-65 shrink-0 flex-col border-r border-[#e3e3e3] bg-white shadow-[4px_0_14px_rgba(0,0,0,0.10)]">
      <div className="flex h-17 items-center px-4">
        <NavLink to={ROUTES.dashboard} className="flex items-center gap-3">
          <div className="relative h-9 w-9">
            <div className="absolute inset-0 rounded-full border-[6px] border-[#144f9e]" />
            <div className="absolute right-0 top-0 h-4 w-4 bg-[#17c7e8]" />
            <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
          </div>
          <span className="text-lg font-bold text-black">OBS Co.Ltd</span>
        </NavLink>
      </div>

      <div className="px-3 pb-3">
        <label className="flex h-10 items-center gap-2.5 rounded-lg bg-[#f4f4f6] px-3 text-[#9a9a9a]">
          <Search size={18} />
          <input
            type="search"
            placeholder="Search ...."
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#9a9a9a]"
          />
        </label>
      </div>

      <nav className="no-scrollbar min-h-0 flex-1 space-y-1 overflow-y-auto px-1 pb-3">
        {navItems.map((item) => {
          const Icon = item.icon;

          if (item.type === "group") {
            const isRouteActive = location.pathname.startsWith(item.prefix);
            const isOpen = openGroup === item.label;
            const isHighlighted = isOpen || isRouteActive;

            return (
              <div key={item.label}>
                <button
                  type="button"
                  onClick={() =>
                    setGroupState({
                      manualOpenGroup: isOpen ? null : item.label,
                      closedActiveGroup:
                        isOpen && isRouteActive ? item.label : null,
                    })
                  }
                  className={[
                    "flex h-13 w-full items-center gap-3 rounded-lg px-5 text-left text-sm font-medium transition",
                    isHighlighted
                      ? "bg-[#252b75] text-white shadow-[0_6px_16px_rgba(37,43,117,0.26)]"
                      : "text-[#3f3f46] hover:bg-[#f4f4f6]",
                  ].join(" ")}
                >
                  <Icon size={18} strokeWidth={1.9} />
                  <span className="min-w-0 flex-1">{item.label}</span>
                  <ChevronDown
                    size={14}
                    className={[
                      "transition-transform",
                      isOpen ? "rotate-180" : "",
                    ].join(" ")}
                  />
                </button>

                {isOpen && (
                  <div className="py-1 flex flex-col">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        className={({ isActive }) =>
                          [
                            "group block rounded-md px-8 py-3 text-sm font-medium leading-5 transition-all duration-300",
                            isActive
                              ? "bg-[#f4f4f6] text-[#252b75]"
                              : "text-[#666] hover:bg-[#f4f4f6] hover:text-[#252b75]",
                          ].join(" ")
                        }
                      >
                        <span className="inline-block transition-transform duration-300 group-hover:-translate-x-0.5">
                          {child.label}
                        </span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "flex h-13 items-center gap-3 rounded-lg px-5 text-sm font-medium transition",
                  isActive
                    ? "bg-[#252b75] text-white shadow-[0_6px_16px_rgba(37,43,117,0.26)]"
                    : "text-[#3f3f46] hover:bg-[#f4f4f6]",
                ].join(" ")
              }
            >
              <Icon size={18} strokeWidth={1.9} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-[#e3e3e3] p-3">
        <div className="flex items-center gap-3">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={displayName}
              className="h-10 w-10 shrink-0 rounded-full object-cover"
            />
          ) : (
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#e7edf7] text-xs font-bold text-[#252b75]">
              {initials}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-[#3f3f46]">
              {displayName}
            </p>
            <p className="text-xs text-[#9a9a9a]">{roleName}</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-md text-[#7a7a7a] hover:bg-[#f4f4f4] hover:text-[#252b75]"
            aria-label="Log out"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SideNavbar;
