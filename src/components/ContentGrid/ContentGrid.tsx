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
  const {
    ref,
    focusKey
  } = useFocusable({
    focusable: true,
    saveLastFocusedChild: true,
    trackChildren: true,
    autoRestoreFocus: true,
    isFocusBoundary: false,
    focusKey: focusKeyParam
  });

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
