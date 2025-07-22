import React, { useCallback, useRef } from "react";
import {
  useFocusable,
  FocusContext,
} from "@noriginmedia/norigin-spatial-navigation";
import { useContentStore, ContentItem } from "../../state/contentStore";
import ContentRow from "./ContentRow";
import FeaturedContent from "./FeaturedContent";
import { FOCUS_KEYS, generateFocusKey } from "../../utils/navigation";
import "./contentGrid.scss";

interface ContentGridProps {
  focusKey: string;
}

const ContentGrid: React.FC<ContentGridProps> = ({ focusKey: focusKeyParam }) => {
  const { featuredContent, contentRows, isLoading } = useContentStore();
  const { ref, focusKey } = useFocusable({
    focusable: true,
    saveLastFocusedChild: true,
    trackChildren: true,
    autoRestoreFocus: true,
    focusKey: focusKeyParam
  });

  const scrollingRef = useRef<HTMLDivElement>(null);

  // Handle row focus to scroll vertically
  const onRowFocus = useCallback(
    ({ y }: { y: number }) => {
      if (scrollingRef.current) {
        scrollingRef.current.scrollTo({
          top: y,
          behavior: "smooth",
        });
      }
    },
    [scrollingRef]
  );

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className="content-grid">
        {featuredContent && (
          <FeaturedContent 
            content={featuredContent} 
          />
        )}

        <div className="content-rows" ref={scrollingRef}>
          {contentRows.map((row, index) => (
            <ContentRow
              key={row.id || index}
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
