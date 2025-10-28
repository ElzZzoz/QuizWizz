import { Outlet, useLocation, useNavigation } from "react-router-dom"; // 1. Import useNavigation
import SideBar from "@/components/shared/Sidebar/Sidebar";
import Navbar from "@/components/shared/Navbar/Navbar";
import { useState, useEffect } from "react";
import { getTabName } from "@/utils/helpers/getTabName";

// 2. (Optional) Create a simple spinner component
const GlobalSpinner = () => (
  <div className="flex h-full w-full items-center justify-center p-8">
    <div className="text-center text-gray-500">Loading page...</div>
    {/* You can replace this with a real spinner icon */}
  </div>
);

function MasterLayout() {
  const location = useLocation();
  const navigation = useNavigation(); // 3. Get navigation state

  // Check if any route loader is active
  const isPageLoading = navigation.state === "loading";

  // ✅ Mobile responsive logic
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(true); // keep sidebar open on desktop
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Detect page title based on path
  const currentTab = getTabName(location.pathname);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* ✅ Sidebar (Responsive) */}
      {sidebarOpen && (
        <div
          className={`fixed md:relative z-50 bg-white border-r border-gray-300
           ${isMobile ? "w-64 h-full" : "w-auto"}`}
        >
          <SideBar onClose={() => isMobile && setSidebarOpen(false)} />
        </div>
      )}

      {/* ✅ Main Content */}
      <div className="flex flex-col flex-1">
        <Navbar
          currentTab={currentTab}
          onMenuClick={() => setSidebarOpen((prev) => !prev)} // toggle sidebar
        />

        <div className="flex-1 overflow-auto">
          {/* 4. Conditionally render Spinner or Outlet */}
          {isPageLoading ? <GlobalSpinner /> : <Outlet />}
        </div>
      </div>
    </div>
  );
}

export default MasterLayout;
