import React from "react";
import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import { useNavigationStore, Page } from "../../state/navigationStore";
import "./menuItem.scss";

interface MenuItemProps {
  id: Page;
  label: string;
  isActive: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ id, label, isActive }) => {
  const { navigateTo } = useNavigationStore();

  const { ref, focused } = useFocusable({
    focusable: true,
    onEnterPress: () => {
      navigateTo(id);
    }
  });

  return (
    <div
      ref={ref}
      className={`menu-item ${focused ? "focused" : ""} ${
        isActive ? "active" : ""
      }`}
    >
      {label}
    </div>
  );
};

export default MenuItem;
