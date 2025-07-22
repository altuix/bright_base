import { detectPlatform } from './detect';

/**
 * Platform capabilities
 * Detects and provides access to platform-specific features
 */

// Interface for platform capabilities
export interface PlatformCapabilities {
  // Video playback capabilities
  supportsDRM: boolean;
  supportsHDR: boolean;
  supports4K: boolean;
  supportsDolbyAtmos: boolean;
  
  // Hardware capabilities
  hasHardwareAcceleration: boolean;
  maxVideoMemory: number;
  
  // Input methods
  hasVoiceControl: boolean;
  hasPointerSupport: boolean;
  
  // Storage
  hasLocalStorage: boolean;
  maxLocalStorageSize: number;
}

// Get capabilities for the current platform
export const getCapabilities = (): PlatformCapabilities => {
  const platform = detectPlatform();
  
  // Base capabilities (conservative defaults)
  const baseCapabilities: PlatformCapabilities = {
    supportsDRM: true,
    supportsHDR: false,
    supports4K: false,
    supportsDolbyAtmos: false,
    hasHardwareAcceleration: true,
    maxVideoMemory: 50 * 1024 * 1024, // 50MB
    hasVoiceControl: false,
    hasPointerSupport: false,
    hasLocalStorage: true,
    maxLocalStorageSize: 5 * 1024 * 1024 // 5MB
  };
  
  // Enhance capabilities based on platform
  switch (platform) {
    case 'tizen':
      return {
        ...baseCapabilities,
        supportsHDR: true,
        supports4K: true,
        supportsDolbyAtmos: true,
        maxVideoMemory: 100 * 1024 * 1024, // 100MB
        hasVoiceControl: true,
        hasPointerSupport: true,
        maxLocalStorageSize: 10 * 1024 * 1024 // 10MB
      };
    
    case 'webos':
      return {
        ...baseCapabilities,
        supportsHDR: true,
        supports4K: true,
        supportsDolbyAtmos: true,
        maxVideoMemory: 80 * 1024 * 1024, // 80MB
        hasVoiceControl: true,
        hasPointerSupport: true,
        maxLocalStorageSize: 10 * 1024 * 1024 // 10MB
      };
    
    case 'hisense':
      return {
        ...baseCapabilities,
        supportsHDR: true,
        supports4K: true,
        supportsDolbyAtmos: false,
        maxVideoMemory: 60 * 1024 * 1024, // 60MB
        hasVoiceControl: false,
        hasPointerSupport: false,
        maxLocalStorageSize: 5 * 1024 * 1024 // 5MB
      };
    
    default:
      return baseCapabilities;
  }
};

// Check if the current platform supports a specific capability
export const hasCapability = (capability: keyof PlatformCapabilities): boolean => {
  const capabilities = getCapabilities();
  return !!capabilities[capability];
};
