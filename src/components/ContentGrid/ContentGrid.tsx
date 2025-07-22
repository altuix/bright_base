import React from 'react';
import { FocusContext, useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { useContentStore } from '../../state/contentStore';
import ContentRow from './ContentRow';
import FeaturedContent from './FeaturedContent';
import './contentGrid.scss';

interface ContentGridProps {
  focusKey: string;
}

const ContentGrid: React.FC<ContentGridProps> = ({ focusKey: focusKeyParam }) => {
  // Add keyboard navigation logging
  const onArrowPress = React.useCallback((direction: string) => {
    console.log(`ContentGrid: Arrow ${direction} pressed`);
    return true; // Let the library handle the navigation
  }, []);

  const {
    ref,
    focusKey,
    focusSelf
  } = useFocusable({
    focusable: true,
    saveLastFocusedChild: true,
    trackChildren: true,
    autoRestoreFocus: true,
    isFocusBoundary: false,
    focusKey: focusKeyParam,
    onArrowPress: onArrowPress,
    onFocus: () => {
      console.log('ContentGrid: Focused');
    },
    onBlur: () => {
      console.log('ContentGrid: Blurred');
    }
  });
  
  // We don't auto-focus the content grid anymore
  // Add logging for focus changes
  React.useEffect(() => {
    console.log('ContentGrid: Component mounted');
    return () => {
      console.log('ContentGrid: Component unmounted');
    };
  }, []);

  const { featuredContent, contentRows } = useContentStore();

  // Handle scroll when row is focused
  const onRowFocus = React.useCallback(
    ({ y }: { y: number }) => {
      if (ref.current) {
        ref.current.scrollTop = y;
        ref.current.style.scrollBehavior = 'smooth';
      }
    },
    [ref]
  );

  return (
    <FocusContext.Provider value={focusKey}>
      <div className="content-grid" ref={ref}>
        {featuredContent && (
          <FeaturedContent content={featuredContent} />
        )}
        
        <div className="content-rows">
          {contentRows.map((row) => (
            <ContentRow
              key={row.id}
              title={row.title}
              items={row.items}
              onFocus={onRowFocus}
            />
          ))}
        </div>
      </div>
    </FocusContext.Provider>
  );
};

export default ContentGrid;
