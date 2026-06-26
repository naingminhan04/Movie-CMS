import { Outlet } from "react-router-dom";

import SideNavbar from "@/components/common/SideNavbar";
import { useAuthProfile } from "@/features/auth/hooks/useAuthProfile";

const MainLayout = () => {
  useAuthProfile();

  return (
    <div className="flex min-h-screen bg-[#f4f4f4]">
      <SideNavbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
