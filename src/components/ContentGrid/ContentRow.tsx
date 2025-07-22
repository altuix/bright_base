import React, { useCallback, useRef } from "react";
import {
  FocusContext,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";
import ContentCard from "./ContentCard";
import { ContentItem } from "../../state/contentStore";
import "./contentRow.scss";

interface ContentRowProps {
  title: string;
  items: ContentItem[];
  onFocus: (layout: { y: number }) => void;
}

const ContentRow: React.FC<ContentRowProps> = ({ title, items, onFocus }) => {
  const { ref, focusKey } = useFocusable({
    focusable: true,
    saveLastFocusedChild: true,
    trackChildren: true,
    onFocus
  });

  const scrollingRef = useRef<HTMLDivElement>(null);

  // Handle horizontal scrolling when item is focused
  const onItemFocus = useCallback(
    ({ x }: { x: number }) => {
      if (scrollingRef.current) {
        scrollingRef.current.scrollTo({
          left: x,
          behavior: "smooth"
        });
      }
    },
    [scrollingRef]
  );

  return (
    <FocusContext.Provider value={focusKey}>
      <div className="content-row" ref={ref}>
        <h3 className="row-title">{title}</h3>
        <div className="row-items" ref={scrollingRef}>
          {items.map((item) => (
            <ContentCard
              key={item.id}
              item={item}
              onFocus={onItemFocus}
            />
          ))}
        </div>
      </div>
    </FocusContext.Provider>
  );
};

export default ContentRow;
