import React from 'react';
import { FocusContext, useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import ContentCard from './ContentCard';
import { ContentItem } from '../../state/contentStore';
import { generateFocusKey } from '../../utils/navigation';
import './contentRow.scss';

interface ContentRowProps {
  title: string;
  items: ContentItem[];
  onFocus: (layout: any) => void;
}

const ContentRow: React.FC<ContentRowProps> = ({ title, items, onFocus }) => {
  // Add logging for arrow key presses
  const onArrowPress = React.useCallback((direction: string) => {
    console.log(`ContentRow (${title}): Arrow ${direction} pressed`);
    return true; // Let the library handle the navigation
  }, [title]);

  const handleFocus = React.useCallback((props: any) => {
    console.log(`ContentRow (${title}): Focused`);
    if (onFocus) {
      onFocus(props);
    }
  }, [title, onFocus]);

  const { ref, focusKey } = useFocusable({
    focusable: true,
    trackChildren: true,
    onFocus: handleFocus,
    onBlur: () => {
      console.log(`ContentRow (${title}): Blurred`);
    },
    onArrowPress
  });

  const scrollingRef = React.useRef<HTMLDivElement>(null);

  // Handle scroll when item is focused
  const onItemFocus = React.useCallback(
    ({ x }: { x: number }) => {
      if (scrollingRef.current) {
        scrollingRef.current.scrollLeft = x;
        scrollingRef.current.style.scrollBehavior = 'smooth';
      }
    },
    [scrollingRef]
  );

  return (
    <FocusContext.Provider value={focusKey}>
      <div className="content-row" ref={ref}>
        <h2 className="row-title">{title}</h2>
        <div className="row-scrolling-wrapper" ref={scrollingRef}>
          <div className="row-items">
            {items.map((item) => (
              <ContentCard
                key={item.id}
                content={item}
                onFocus={onItemFocus}
                focusKey={generateFocusKey('content', item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </FocusContext.Provider>
  );
};

export default ContentRow;
