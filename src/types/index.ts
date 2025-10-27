import type { JSX } from "react";

export interface SidebarItem {
  key: string;
  label: string;
  icon: JSX.Element;
  path: string;
}

export interface AppSidebarProps {
  onClose?: () => void;
}

export type ModalMode = "add" | "edit" | "delete" | null;
