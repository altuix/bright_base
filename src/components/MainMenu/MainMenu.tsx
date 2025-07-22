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
  const { ref, focusSelf, hasFocusedChild, focusKey, setFocus } = useFocusable({
    focusable: true,
    saveLastFocusedChild: true,
    trackChildren: true,
    autoRestoreFocus: true,
    focusKey: focusKeyParam,
    onArrowPress: (direction) => {
      console.log('MainMenu onArrowPress:', direction);
      if (direction === 'right') {
        console.log('MainMenu: Attempting to navigate right to content grid');
        setFocus('CONTENT_GRID');
        return true;
      }
      return false;
    }
  });

  const { currentPage } = useNavigationStore();

  // Log when focus changes for debugging
  useEffect(() => {
    console.log('MainMenu hasFocusedChild:', hasFocusedChild);
  }, [hasFocusedChild]);

  // Focus the menu when it mounts
  useEffect(() => {
    focusSelf();
  }, [focusSelf]);

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
