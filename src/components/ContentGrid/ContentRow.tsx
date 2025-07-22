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
  const { ref, focusKey } = useFocusable({
    onFocus
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
