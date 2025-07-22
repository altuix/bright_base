import React, { useEffect } from 'react';
import { FocusContext, useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { useNavigationStore } from '../state/navigationStore';
import { useContentStore } from '../state/contentStore';
import MainMenu from '../components/MainMenu/MainMenu';
import ContentGrid from '../components/ContentGrid/ContentGrid';
import { FOCUS_KEYS } from '../utils/navigation';
import '../styles/layouts/mainLayout.scss';

const MainLayout: React.FC = () => {
  const { focusKey, hasFocusedChild } = useFocusable({
    focusable: true,
    saveLastFocusedChild: true,
    trackChildren: true,
    autoRestoreFocus: true,
    isFocusBoundary: false,
    focusKey: FOCUS_KEYS.APP
  });
  
  const { fetchHomeContent, isLoading } = useContentStore();
  const { lastFocusedKeys, currentPage } = useNavigationStore();
  
  // Fetch content when component mounts
  useEffect(() => {
    fetchHomeContent();
  }, [fetchHomeContent]);
  
  return (
    <FocusContext.Provider value={focusKey}>
      <div className="main-layout">
        <MainMenu focusKey={FOCUS_KEYS.MAIN_MENU} />
        <div className="main-content">
          {isLoading ? (
            <div className="loading">Loading content...</div>
          ) : (
            <ContentGrid focusKey={FOCUS_KEYS.CONTENT_GRID} />
          )}
        </div>
      </div>
    </FocusContext.Provider>
  );
};

export default MainLayout;
