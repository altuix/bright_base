import { create } from 'zustand';
import { FOCUS_KEYS } from '../utils/navigation';

export type Page = 'home' | 'detail' | 'player' | 'search' | 'settings' | 'movies' | 'series' | 'live';

interface NavigationState {
  // Current page in the app
  currentPage: Page;
  // History stack for navigation
  history: Page[];
  // Last focused element keys for each page
  lastFocusedKeys: Record<Page, string>;
  // Root focus key for the app
  focusKey: string;
  // Navigation actions
  navigateTo: (page: Page) => void;
  navigateBack: () => void;
  setLastFocusedKey: (page: Page, key: string) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  currentPage: 'home',
  history: ['home'],
  lastFocusedKeys: {
    home: FOCUS_KEYS.CONTENT_GRID,
    detail: FOCUS_KEYS.DETAIL_ACTIONS,
    player: FOCUS_KEYS.PLAYER_CONTROLS,
    search: FOCUS_KEYS.SEARCH,
    settings: FOCUS_KEYS.SETTINGS,
    movies: FOCUS_KEYS.CONTENT_GRID,
    series: FOCUS_KEYS.CONTENT_GRID,
    live: FOCUS_KEYS.CONTENT_GRID
  },
  focusKey: FOCUS_KEYS.APP,
  
  navigateTo: (page) => set((state) => {
    // Add current page to history before navigating
    const newHistory = [...state.history, page];
    return {
      currentPage: page,
      history: newHistory
    };
  }),
  
  navigateBack: () => set((state) => {
    // Can't go back if we're at the first page
    if (state.history.length <= 1) {
      return state;
    }
    
    // Remove current page from history and go to previous page
    const newHistory = state.history.slice(0, -1);
    const previousPage = newHistory[newHistory.length - 1];
    
    return {
      currentPage: previousPage,
      history: newHistory
    };
  }),
  
  setLastFocusedKey: (page, key) => set((state) => ({
    lastFocusedKeys: {
      ...state.lastFocusedKeys,
      [page]: key
    }
  }))
}));
