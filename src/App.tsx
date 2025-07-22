import React, { useEffect } from 'react';
import { FocusContext, useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { useNavigationStore } from './state/navigationStore';
import { useAuthStore } from './state/authStore';
import MainLayout from './layouts/MainLayout';
import PlayerLayout from './layouts/PlayerLayout';
import DetailLayout from './layouts/DetailLayout';
import { initNavigation } from './utils/navigation';
import './styles/app.scss';

const App: React.FC = () => {
  const { ref, focusKey } = useFocusable({
    focusable: true,
    saveLastFocusedChild: true,
    trackChildren: true,
    autoRestoreFocus: true
  });
  
  const { currentPage } = useNavigationStore();
  const { isAuthenticated, checkAuth } = useAuthStore();

  // Initialize spatial navigation and check authentication on app start
  useEffect(() => {
    initNavigation();
    checkAuth();
  }, [checkAuth]);

  // Render the appropriate layout based on current page
  const renderContent = () => {
    switch (currentPage) {
      case 'player':
        return <PlayerLayout />;
      case 'detail':
        return <DetailLayout />;
      default:
        return <MainLayout />;
    }
  };

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className="app">
        {renderContent()}
      </div>
    </FocusContext.Provider>
  );
};

export default App;
