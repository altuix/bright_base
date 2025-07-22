import React, { useEffect } from "react";
import {
  useFocusable,
  FocusContext,
} from "@noriginmedia/norigin-spatial-navigation";
import MenuItem from "./MenuItem";
import { useNavigationStore, Page } from "../../state/navigationStore";
import "./mainMenu.scss";

interface MainMenuProps {
  focusKey: string;
}

// Menu items definition
const menuItems: { id: Page; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "movies", label: "Movies" },
  { id: "series", label: "TV Shows" },
  { id: "live", label: "Live TV" },
  { id: "search", label: "Search" },
  { id: "settings", label: "Settings" },
];

const MainMenu: React.FC<MainMenuProps> = ({ focusKey: focusKeyParam }) => {
  const { ref, focusSelf, hasFocusedChild, focusKey } = useFocusable({
    focusable: true,
    saveLastFocusedChild: true,
    trackChildren: true,
    autoRestoreFocus: true,
    isFocusBoundary: false,
    focusKey: focusKeyParam,
    preferredChildFocusKey: undefined,
    onEnterPress: () => {},
  });

  const { currentPage } = useNavigationStore();

  // Focus the menu when it mounts
  useEffect(() => {
    console.log('MainMenu: Focusing self on mount');
    focusSelf();
  }, [focusSelf]);
  
  // Add logging for focus changes
  useEffect(() => {
    console.log(`MainMenu: hasFocusedChild changed to ${hasFocusedChild}`);
  }, [hasFocusedChild]);

  return (
    <FocusContext.Provider value={focusKey}>
      <div
        ref={ref}
        className={`main-menu ${hasFocusedChild ? "focused" : ""}`}
      >
        <div className="logo">
          <h1>SmartTV</h1>
        </div>
        <div className="menu-items">
          {menuItems.map((item) => (
            <MenuItem
              key={item.id}
              id={item.id}
              label={item.label}
              isActive={currentPage === item.id}
            />
          ))}
        </div>
      </div>
    </FocusContext.Provider>
  );
};

export default MainMenu;
