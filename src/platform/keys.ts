import { detectPlatform, PlatformType } from './detect';

/**
 * Key code mapping for different TV platforms
 * Maps standard key names to platform-specific key codes
 */

// Define key code mapping interface
interface KeyCodeMapping {
  [key: string]: number | string;
}

// Tizen key codes
const tizenKeyCodes: KeyCodeMapping = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
  ENTER: 13,
  BACK: 10009,
  EXIT: 10182,
  PLAY: 415,
  PAUSE: 19,
  PLAY_PAUSE: 10252,
  STOP: 413,
  FAST_FORWARD: 417,
  REWIND: 412,
  INFO: 457,
  MENU: 10135,
  RED: 403,
  GREEN: 404,
  YELLOW: 405,
  BLUE: 406,
  CHANNEL_UP: 427,
  CHANNEL_DOWN: 428
};

// WebOS key codes
const webOSKeyCodes: KeyCodeMapping = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
  ENTER: 13,
  BACK: 461,
  EXIT: 27,
  PLAY: 415,
  PAUSE: 19,
  PLAY_PAUSE: 10252,
  STOP: 413,
  FAST_FORWARD: 417,
  REWIND: 412,
  INFO: 457,
  MENU: 457,
  RED: 403,
  GREEN: 404,
  YELLOW: 405,
  BLUE: 406,
  CHANNEL_UP: 33,
  CHANNEL_DOWN: 34
};

// Hisense key codes
const hisenseKeyCodes: KeyCodeMapping = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
  ENTER: 13,
  BACK: 8,
  EXIT: 27,
  PLAY: 415,
  PAUSE: 19,
  PLAY_PAUSE: 10252,
  STOP: 413,
  FAST_FORWARD: 417,
  REWIND: 412,
  INFO: 457,
  MENU: 36,
  RED: 403,
  GREEN: 404,
  YELLOW: 405,
  BLUE: 406,
  CHANNEL_UP: 427,
  CHANNEL_DOWN: 428
};

// Generic key codes (fallback)
const genericKeyCodes: KeyCodeMapping = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
  ENTER: 13,
  BACK: 8,
  EXIT: 27,
  PLAY: 32, // Space
  PAUSE: 32, // Space
  PLAY_PAUSE: 32, // Space
  STOP: 83, // S
  FAST_FORWARD: 70, // F
  REWIND: 82, // R
  INFO: 73, // I
  MENU: 77, // M
  RED: 49, // 1
  GREEN: 50, // 2
  YELLOW: 51, // 3
  BLUE: 52, // 4
  CHANNEL_UP: 33, // Page Up
  CHANNEL_DOWN: 34 // Page Down
};

// Get key codes for the current platform
export const getKeyCodes = (): KeyCodeMapping => {
  const platform = detectPlatform();
  
  switch (platform) {
    case 'tizen':
      return tizenKeyCodes;
    case 'webos':
      return webOSKeyCodes;
    case 'hisense':
      return hisenseKeyCodes;
    default:
      return genericKeyCodes;
  }
};

// Check if a key event matches a specific key
export const isKey = (event: KeyboardEvent, keyName: string): boolean => {
  const keyCodes = getKeyCodes();
  const keyCode = keyCodes[keyName];
  
  if (typeof keyCode === 'number') {
    return event.keyCode === keyCode || event.which === keyCode;
  }
  
  return event.key === keyCode;
};

// Register a key handler for a specific key
export const registerKeyHandler = (
  keyName: string, 
  handler: (event: KeyboardEvent) => void
): () => void => {
  const keyHandler = (event: KeyboardEvent) => {
    if (isKey(event, keyName)) {
      handler(event);
      event.preventDefault();
    }
  };
  
  window.addEventListener('keydown', keyHandler);
  
  // Return unregister function
  return () => {
    window.removeEventListener('keydown', keyHandler);
  };
};
