/**
 * Virtualization Utilities
 * Helpers for implementing efficient rendering of large lists/grids
 */

import { useState, useEffect, useRef } from 'react';

interface VirtualizationOptions {
  itemCount: number;
  itemSize: number;
  overscan?: number;
  direction?: 'horizontal' | 'vertical';
}

interface VirtualizationResult {
  startIndex: number;
  endIndex: number;
  visibleItems: number[];
  scrollTo: (index: number) => void;
  containerProps: {
    ref: React.RefObject<HTMLDivElement>;
    style: React.CSSProperties;
    onScroll: (event: React.UIEvent) => void;
  };
}

/**
 * Simple virtualization hook for efficient rendering of large lists
 * This is a lightweight alternative to more complex libraries
 */
export const useVirtualization = ({
  itemCount,
  itemSize,
  overscan = 5,
  direction = 'vertical'
}: VirtualizationOptions): VirtualizationResult => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Calculate visible range
  const isHorizontal = direction === 'horizontal';
  const totalSize = itemCount * itemSize;
  
  // Calculate visible indices
  const getVisibleRange = () => {
    if (!containerRef.current) {
      return { startIndex: 0, endIndex: Math.min(itemCount - 1, 20) };
    }
    
    const viewportSize = isHorizontal 
      ? containerRef.current.clientWidth 
      : containerRef.current.clientHeight;
    
    const startIndex = Math.max(0, Math.floor(scrollPosition / itemSize) - overscan);
    const endIndex = Math.min(
      itemCount - 1,
      Math.ceil((scrollPosition + viewportSize) / itemSize) + overscan
    );
    
    return { startIndex, endIndex };
  };
  
  const { startIndex, endIndex } = getVisibleRange();
  const visibleItems = Array.from(
    { length: endIndex - startIndex + 1 },
    (_, i) => startIndex + i
  );
  
  // Handle scroll events
  const handleScroll = (event: React.UIEvent) => {
    const target = event.target as HTMLDivElement;
    const newPosition = isHorizontal ? target.scrollLeft : target.scrollTop;
    setScrollPosition(newPosition);
  };
  
  // Scroll to a specific index
  const scrollTo = (index: number) => {
    if (containerRef.current) {
      const position = index * itemSize;
      
      if (isHorizontal) {
        containerRef.current.scrollLeft = position;
      } else {
        containerRef.current.scrollTop = position;
      }
    }
  };
  
  // Container style
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'auto',
    ...(isHorizontal 
      ? { width: '100%', height: '100%', overflowX: 'auto', overflowY: 'hidden' }
      : { width: '100%', height: '100%', overflowY: 'auto', overflowX: 'hidden' }
    ),
    ...(isHorizontal 
      ? { scrollbarWidth: 'none' } as any
      : { scrollbarWidth: 'none' } as any
    )
  };
  
  return {
    startIndex,
    endIndex,
    visibleItems,
    scrollTo,
    containerProps: {
      ref: containerRef,
      style: containerStyle,
      onScroll: handleScroll
    }
  };
};

/**
 * Calculate the position and dimensions for a virtualized item
 */
export const getVirtualItemStyle = (
  index: number,
  itemSize: number,
  direction: 'horizontal' | 'vertical' = 'vertical'
): React.CSSProperties => {
  return direction === 'horizontal'
    ? {
        position: 'absolute',
        left: `${index * itemSize}px`,
        width: `${itemSize}px`,
        height: '100%'
      }
    : {
        position: 'absolute',
        top: `${index * itemSize}px`,
        height: `${itemSize}px`,
        width: '100%'
      };
};
