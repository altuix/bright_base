import React, { useEffect } from "react";
import {
  useFocusable,
  FocusContext,
} from "@noriginmedia/norigin-spatial-navigation";
import { useContentStore } from "../../state/contentStore";
import ContentItem from "./ContentItem";
import "./contentGrid.scss";

interface ContentGridProps {
  focusKey: string;
}

// Sample content items for immediate rendering
const contentItems = [
  { id: "item1", title: "Action Movie 1", genre: "Action" },
  { id: "item2", title: "Comedy Show 1", genre: "Comedy" },
  { id: "item3", title: "Drama Series 1", genre: "Drama" },
  { id: "item4", title: "Horror Film 1", genre: "Horror" },
  { id: "item5", title: "Action Movie 2", genre: "Action" },
  { id: "item6", title: "Comedy Show 2", genre: "Comedy" },
  { id: "item7", title: "Drama Series 2", genre: "Drama" },
  { id: "item8", title: "Horror Film 2", genre: "Horror" },
];

const ContentGrid: React.FC<ContentGridProps> = ({
  focusKey: focusKeyParam,
}) => {
  const { ref, focusSelf, hasFocusedChild, focusKey, setFocus } = useFocusable({
    focusable: true,
    saveLastFocusedChild: true,
    trackChildren: true,
    autoRestoreFocus: true,
    focusKey: focusKeyParam,
    preferredChildFocusKey: undefined,
    onArrowPress: (direction) => {
      console.log('ContentGrid onArrowPress:', direction);
      if (direction === 'left') {
        console.log('ContentGrid: Attempting to navigate left to menu');
        setFocus('MENU');
        return true;
      }
      return false;
    }
  });

  const { contentRows } = useContentStore();

  // Log when focus changes for debugging
  useEffect(() => {
    console.log('ContentGrid hasFocusedChild:', hasFocusedChild);
  }, [hasFocusedChild]);

  // Focus the grid when it mounts
  useEffect(() => {
    focusSelf();
  }, [focusSelf]);

  return (
    <FocusContext.Provider value={focusKey}>
      <div
        ref={ref}
        className={`content-grid ${hasFocusedChild ? "focused" : ""}`}
      >
        <div className="grid-title">
          <h2>Featured Content</h2>
        </div>
        <div className="grid-items">
          {contentItems.map((item) => (
            <ContentItem
              key={item.id}
              id={item.id}
              title={item.title}
              genre={item.genre}
            />
          ))}
        </div>
      </div>
    </FocusContext.Provider>
  );
};

export default ContentGrid;
