import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { menuItems } from "./menuItems";

export function useActiveItem() {
  const location = useLocation();

  const findActiveKey = (pathname: string) => {
    const matches = menuItems.filter((item) => {
      return (
        pathname === item.path ||
        pathname.startsWith(item.path + "/") ||
        pathname.startsWith(item.path)
      );
    });

    if (matches.length === 0) return "";
    matches.sort((a, b) => b.path.length - a.path.length);
    return matches[0].key;
  };

  const initial = useMemo(
    () => findActiveKey(location.pathname),
    [location.pathname]
  );
  const [activeItem, setActiveItem] = useState(initial);

  useEffect(() => {
    const newKey = findActiveKey(location.pathname);
    if (newKey !== activeItem) {
      setActiveItem(newKey);
    }
  }, [location.pathname]);

  return { activeItem, setActiveItem };
}
