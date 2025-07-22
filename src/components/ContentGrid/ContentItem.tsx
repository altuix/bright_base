import React from "react";
import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import { useNavigationStore } from "../../state/navigationStore";
import { useContentStore } from "../../state/contentStore";
import type { ContentItem as ContentItemType } from "../../state/contentStore";
import "./contentItem.scss";

interface ContentItemProps {
  id: string;
  title: string;
  genre: string;
}

const ContentItem: React.FC<ContentItemProps> = ({ id, title, genre }) => {
  const { navigateTo } = useNavigationStore();
  const { selectContent } = useContentStore();

  // Generate color based on genre for visual distinction
  const getColorFromGenre = () => {
    switch(genre.toLowerCase()) {
      case "action": return "#FF5252";
      case "comedy": return "#536DFE";
      case "drama": return "#388E3C";
      case "horror": return "#D32F2F";
      default: return "#7B1FA2";
    }
  };

  const { ref, focused } = useFocusable({
    focusable: true,
    onEnterPress: () => {
      // Create a mock content item to select
      const contentItem: ContentItemType = {
        id,
        title,
        genre,
        imageUrl: `https://via.placeholder.com/300x200/333333/FFFFFF?text=${encodeURIComponent(title)}`,
        type: "movie",
        description: `This is a description for ${title}. A sample ${genre} content.`,
        duration: 120,
        rating: 4.5
      };
      selectContent(contentItem);
      navigateTo("detail");
    }
  });

  return (
    <div
      ref={ref}
      className={`content-item ${focused ? "focused" : ""}`}
      style={{ backgroundColor: getColorFromGenre() }}
    >
      <div className="item-title">{title}</div>
      <div className="item-genre">{genre}</div>
    </div>
  );
};

export default ContentItem;
