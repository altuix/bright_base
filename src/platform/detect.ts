/**
 * Platform detection utility
 * Detects the current TV platform (Tizen, webOS, Hisense, etc.)
 */

// Extend Window interface to include platform-specific globals
declare global {
  interface Window {
    tizen?: any;
    webOS?: any;
    HISENSE?: any;
  }
}

export type PlatformType = "tizen" | "webos" | "hisense" | "generic";

// Check if running on Tizen
const isTizen = (): boolean => {
  return typeof window !== "undefined" && 'tizen' in window;
};

// Check if running on webOS
const isWebOS = (): boolean => {
  return typeof window !== "undefined" && 'webOS' in window;
};

// Check if running on Hisense
const isHisense = (): boolean => {
  // Hisense detection is more complex and may require checking
  // specific user agent patterns or global objects
  const ua = navigator.userAgent.toLowerCase();
  return (
    ua.includes("hisense") ||
    ua.includes("vidaa") ||
    (typeof window !== "undefined" && 'HISENSE' in window)
  );
};

// Detect the current platform
export const detectPlatform = (): PlatformType => {
  if (isTizen()) return "tizen";
  if (isWebOS()) return "webos";
  if (isHisense()) return "hisense";
  return "generic";
};

// Get platform name for display
export const getPlatformName = (): string => {
  const platform = detectPlatform();

  switch (platform) {
    case "tizen":
      return "Samsung Tizen";
    case "webos":
      return "LG webOS";
    case "hisense":
      return "Hisense VIDAA";
    default:
      return "Generic TV";
  }
};
