import { Outlet, useLocation } from "react-router-dom";

import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/routes/path";

const pageTitles: Record<string, string> = {
  [ROUTES.dashboard]: "Dashboard",
  [ROUTES.videosList]: "Videos List",
  [ROUTES.categories]: "Categories",
  [ROUTES.genres]: "Genres",
  [ROUTES.casts]: "Casts",
  [ROUTES.roles]: "Roles",
  [ROUTES.collections]: "Collections",
  [ROUTES.viewCount]: "View Count",
  [ROUTES.programs]: "Programs",
  [ROUTES.banners]: "Banners",
  [ROUTES.ads]: "Ads",
  [ROUTES.customerList]: "Customer List",
  [ROUTES.banList]: "Ban List",
  [ROUTES.packages]: "Packages",
  [ROUTES.promotions]: "Promotions",
  [ROUTES.transactions]: "Transaction",
  [ROUTES.announcements]: "Announcements",
  [ROUTES.videoAnalytics]: "Video Analytics",
  [ROUTES.programAnalytics]: "Program Analytics",
  [ROUTES.licensedVideos]: "Licensed Videos",
  [ROUTES.adminList]: "Admin List",
  [ROUTES.roleManagement]: "Role Management",
  [ROUTES.userLogs]: "User Logs",
  [ROUTES.auditLogs]: "Audit Logs",
  [ROUTES.reminders]: "Reminders",
  [ROUTES.smtp]: "SMTP",
  [ROUTES.faqs]: "FAQs",
  [ROUTES.termAndConditions]: "Terms & Conditions",
  [ROUTES.privacyAndPolicy]: "Privacy Policy",
};

const PageFrame = () => {
  const location = useLocation();
  const title = pageTitles[location.pathname] ?? "Dashboard";

  return (
    <div className="min-w-0 flex-1 bg-[#f4f4f4]">
      <PageHeader title={title} />

      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default PageFrame;
