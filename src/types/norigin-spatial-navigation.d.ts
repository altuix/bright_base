/**
 * Type definitions for @noriginmedia/norigin-spatial-navigation v2.3.0
 */

declare module '@noriginmedia/norigin-spatial-navigation' {
  import { Context } from 'react';
  
  export type DistanceCalculationMethod = 'centers' | 'corners' | 'edges';
  
  export interface FocusableComponentProps {
    focusKey: string;
    focusable?: boolean;
    focused?: boolean;
    onEnterPress?: (props: any) => void;
    onArrowPress?: (direction: string, props: any) => boolean | void;
    onFocus?: (layout: any, props: any, details: any) => void;
    onBlur?: (layout: any, props: any, details: any) => void;
  }

  export interface SpatialNavConfig {
    debug?: boolean;
    visualDebug?: boolean;
    useGetBoundingClientRect?: boolean;
    shouldFocusDOMNode?: boolean;
    nativeMode?: boolean;
    rtl?: boolean;
    throttle?: number;
    throttleKeypresses?: boolean;
    domNodeFocusOptions?: FocusOptions;
    shouldUseNativeEvents?: boolean;
    distanceCalculationMethod?: DistanceCalculationMethod;
  }

  export interface FocusableConfig {
    focusKey?: string;
    trackChildren?: boolean;
    autoRestoreFocus?: boolean;
    isFocusBoundary?: boolean;
    focusBoundaryDirections?: string[];
    focusable?: boolean;
    saveLastFocusedChild?: boolean;
    preferredChildFocusKey?: string;
    onEnterPress?: (props: any) => void;
    onArrowPress?: (direction: string, props: any) => boolean | void;
    onFocus?: (layout: any, props: any, details: any) => void;
    onBlur?: (layout: any, props: any, details: any) => void;
    extraProps?: any;
    forceFocus?: boolean;
  }
  
  export interface FocusableHookReturnValue {
    ref: React.RefObject<any>;
    focusSelf: () => void;
    focused: boolean;
    hasFocusedChild: boolean;
    focusKey: string;
    parentFocusKey?: string;
    setFocus: (focusKey: string) => void;
    navigateByDirection: (direction: string) => void;
    pause: () => void;
    resume: () => void;
    updateAllLayouts: () => void;
    getCurrentFocusKey: () => string;
  }
  
  export function useFocusable(config?: FocusableConfig): FocusableHookReturnValue;

  export function init(config?: SpatialNavConfig): void;
  export function setKeyMap(keyMap: { [key: string]: number }): void;
  export function destroy(): void;
  export function focus(focusKey: string): void;
  export function getNodeByFocusKey(focusKey: string): HTMLElement | null;
  export function getFocusedKey(): string;
  export function getAllFocusableKeys(): string[];
  export function pause(): void;
  export function resume(): void;
  export function updateAllLayouts(): void;
  export function navigateByDirection(direction: string): void;
  
  export interface FocusContextInterface {
    focusKey: string;
    focusPath: string[];
    setFocus: (focusKey: string) => void;
    navigateByDirection: (direction: string) => void;
    pause: () => void;
    resume: () => void;
    updateAllLayouts: () => void;
  }
  
  // Focus context for accessing focus state throughout the app
  export const FocusContext: Context<string>;
}
