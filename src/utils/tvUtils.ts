/**
 * TV Utilities
 * Helper functions for TV-specific features
 */

import { registerKeyHandler } from '../platform/keys';
import { useNavigationStore } from '../state/navigationStore';

/**
 * Register global back button handler
 * This will handle the back button press across the entire app
 */
export const registerGlobalBackHandler = (): () => void => {
  const { navigateBack } = useNavigationStore.getState();
  
  return registerKeyHandler('BACK', (event) => {
    // Prevent default behavior (e.g., browser back)
    event.preventDefault();
    
    // Navigate back in our app
    navigateBack();
  });
};

/**
 * Handle exit key (usually EXIT or HOME button on remote)
 * This will show a confirmation dialog before exiting the app
 */
export const registerExitHandler = (): () => void => {
  return registerKeyHandler('EXIT', (event) => {
    event.preventDefault();
    
    // In a real app, this would show a confirmation dialog
    const confirmExit = window.confirm('Are you sure you want to exit the app?');
    
    if (confirmExit) {
      // For Tizen, we would use tizen.application.getCurrentApplication().exit()
      // For webOS, we would use webOS.platformBack()
      // For browser testing, we can just show an alert
      alert('Exiting application');
    }
  });
};

/**
 * Initialize TV-specific features
 * Call this once when the app starts
 */
export const initTvFeatures = (): void => {
  // Register global key handlers
  registerGlobalBackHandler();
  registerExitHandler();
  
  // Disable browser-specific features that don't make sense on TV
  disableBrowserFeatures();
};

/**
 * Disable browser features that don't make sense on TV
 */
const disableBrowserFeatures = (): void => {
  // Prevent context menu
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
  });
  
  // Prevent text selection
  document.addEventListener('selectstart', (e) => {
    e.preventDefault();
    return false;
  });
  
  // Prevent drag and drop
  document.addEventListener('dragstart', (e) => {
    e.preventDefault();
    return false;
  });
};
