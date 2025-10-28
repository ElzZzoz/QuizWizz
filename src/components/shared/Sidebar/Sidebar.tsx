import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/MasterLayout/Logo icon.png";
import { renderIcon } from "./SidebarIcon";
import { useActiveItem } from "./useActiveItem";
import type { AppSidebarProps } from "@/types/index";
import { useState } from "react";
import CookieServices from "@/services/CookieServices/CookieServices";
import { getMenuItems } from "./menuItems";

export default function AppSidebar({ onClose }: AppSidebarProps) {
  const navigate = useNavigate();
  const { activeItem, setActiveItem } = useActiveItem();
  const [collapsed, setCollapsed] = useState(false);
  const userRole = CookieServices.get("role") || "Instructor"; // Default to 'instructor' if not found
  const menuItems = getMenuItems(userRole);

  return (
    <Sidebar
      collapsed={collapsed}
      backgroundColor="#FFF"
      rootStyles={{ borderRight: "1px solid #00000033" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-[#00000033]">
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="p-2 rounded-md hover:bg-[#FFEDDF] transition hidden md:block"
        >
          <FaBars />
        </button>

        {!collapsed && onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-red-50 text-red-600 transition md:hidden"
          >
            ✕
          </button>
        )}

        {!collapsed && (
          <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
        )}
      </div>

      {/* Menu Items */}
      <Menu>
        {menuItems.map((item) => (
          <MenuItem
            key={item.key}
            active={activeItem === item.key}
            icon={renderIcon(item.icon, activeItem === item.key)}
            onClick={() => {
              setActiveItem(item.key);
              navigate(item.path);
              onClose?.(); // ✅ Always close sidebar if prop exists
            }}
            className="border-t border-[#00000033] py-2"
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </Sidebar>
  );
}
