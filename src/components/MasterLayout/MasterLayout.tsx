import { Outlet } from "react-router-dom";
import SideBar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";

function MasterLayout() {
  const isMobile = false; // ignore responsive logic for now

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar (hidden on mobile) */}
      {!isMobile && (
        <div className="bg-gray-100">
          <SideBar />
        </div>
      )}

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MasterLayout;
