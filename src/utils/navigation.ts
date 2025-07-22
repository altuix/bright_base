import { init } from "@noriginmedia/norigin-spatial-navigation";

/**
 * Initialize the Norigin Spatial Navigation with appropriate settings for TV
 */
export const initNavigation = () => {
  init({
    debug: true, // Enable for debugging
    visualDebug: true, // Enable to see focus boundaries
    useGetBoundingClientRect: true,
    throttle: 0,
    shouldFocusDOMNode: true,
    // Use corners distance calculation for better spatial navigation
    distanceCalculationMethod: "corners"
  });
};

/**
 * Focus key constants to maintain consistency across the app
 */
export const FOCUS_KEYS = {
  APP: "APP",
  MAIN_MENU: "MENU",
  CONTENT_GRID: "CONTENT_GRID",
  CONTENT_ROW: "CONTENT_ROW",
  PLAYER_CONTROLS: "PLAYER_CONTROLS",
  DETAIL_ACTIONS: "DETAIL_ACTIONS",
  DETAIL_LAYOUT: "DETAIL_LAYOUT",
  SEARCH: "SEARCH",
  SETTINGS: "SETTINGS",
};

/**
 * Helper function to generate unique focus keys for dynamic items
 */
export const generateFocusKey = (
  prefix: string,
  id: string | number
): string => {
  return `${prefix}_${id}`;
};
