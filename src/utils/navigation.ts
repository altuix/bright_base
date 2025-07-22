import { init } from '@noriginmedia/norigin-spatial-navigation';

/**
 * Initialize the Norigin Spatial Navigation with appropriate settings for TV
 */
export const initNavigation = () => {
  init({
    debug: false,
    visualDebug: false,
    // Use default settings for better performance
    useGetBoundingClientRect: true,
    // Enable throttling for smoother navigation
    throttle: 0,
    // Enable DOM node focus for better accessibility
    shouldFocusDOMNode: true
  });
};

/**
 * Focus key constants to maintain consistency across the app
 */
export const FOCUS_KEYS = {
  APP: 'app-focus',
  MAIN_MENU: 'main-menu-focus',
  CONTENT_GRID: 'content-grid-focus',
  CONTENT_ROW: 'content-row-focus',
  PLAYER_CONTROLS: 'player-controls-focus',
  DETAIL_ACTIONS: 'detail-actions-focus',
  DETAIL_LAYOUT: 'detail-layout-focus',
  SEARCH: 'search-focus',
  SETTINGS: 'settings-focus'
};

/**
 * Helper function to generate unique focus keys for dynamic items
 */
export const generateFocusKey = (prefix: string, id: string | number): string => {
  return `${prefix}-${id}`;
};
