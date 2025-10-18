import { useState, type JSX } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { FaHome, FaUser, FaCog, FaBars } from "react-icons/fa";
import logo from "@/assets/MasterLayout/Logo icon.png";

export default function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("home");

  // helper to render icon with smooth transitions
  const renderIcon = (icon: JSX.Element, isActive: boolean) => (
    <div
      className={`flex items-center justify-center w-[45px] h-[45px] rounded-[10px] 
      transition-colors duration-300 ease-in-out ${
        isActive ? "bg-[#000000]" : "bg-[#FFEDDF]"
      }`}
    >
      <div
        className={`text-xl transition-colors duration-300 ease-in-out ${
          isActive ? "text-white" : "text-black"
        }`}
      >
        {icon}
      </div>
    </div>
  );

  return (
    <Sidebar
      collapsed={collapsed}
      backgroundColor="#FFFFFF"
      rootStyles={{
        borderRight: "1px solid #00000033",
      }}
      className="h-full"
    >
      {/* Header Section */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#00000033]">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-md hover:bg-[#FFEDDF] transition-colors duration-200"
        >
          <FaBars className="text-gray-800" />
        </button>
        {!collapsed && (
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
          </div>
        )}
      </div>

      {/* Sidebar Menu */}
      <Menu>
        <MenuItem
          active={activeItem === "home"}
          onClick={() => setActiveItem("home")}
          icon={renderIcon(<FaHome />, activeItem === "home")}
          className={`border-t border-[#00000033] py-2 transition-all duration-300 ${
            activeItem === "home" ? "text-black font-semibold" : "text-gray-700"
          }`}
        >
          Home
        </MenuItem>

        <MenuItem
          active={activeItem === "profile"}
          onClick={() => setActiveItem("profile")}
          icon={renderIcon(<FaUser />, activeItem === "profile")}
          className={`border-t border-[#00000033] py-2 transition-all duration-300 ${
            activeItem === "profile"
              ? "text-black font-semibold"
              : "text-gray-700"
          }`}
        >
          Profile
        </MenuItem>

        <MenuItem
          active={activeItem === "settings"}
          onClick={() => setActiveItem("settings")}
          icon={renderIcon(<FaCog />, activeItem === "settings")}
          className={`border-t border-[#00000033] py-2 transition-all duration-300 ${
            activeItem === "settings"
              ? "text-black font-semibold"
              : "text-gray-700"
          }`}
        >
          Settings
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}
