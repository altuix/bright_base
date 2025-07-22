import React, { useEffect } from "react";
import {
  FocusContext,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";
import { useNavigationStore } from "../state/navigationStore";
import { useContentStore } from "../state/contentStore";
import MainMenu from "../components/MainMenu/MainMenu";
import ContentGrid from "../components/ContentGrid/ContentGrid";
import { FOCUS_KEYS } from "../utils/navigation";
import "../styles/layouts/mainLayout.scss";

const MainLayout: React.FC = () => {
  // Use minimal configuration for the app container
  const { ref, focusKey } = useFocusable({
    focusable: true,
    saveLastFocusedChild: true,
    trackChildren: true,
    autoRestoreFocus: true,
    focusKey: FOCUS_KEYS.APP,
  });

  const { fetchHomeContent, isLoading } = useContentStore();

  // Fetch content when component mounts
  useEffect(() => {
    fetchHomeContent();
  }, [fetchHomeContent]);

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className="main-layout">
        <MainMenu focusKey={FOCUS_KEYS.MAIN_MENU} />
        <ContentGrid focusKey={FOCUS_KEYS.CONTENT_GRID} />
      </div>
    </FocusContext.Provider>
  );
};

export default MainLayout;
