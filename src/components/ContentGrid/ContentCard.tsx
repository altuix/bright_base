import React from "react";
import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import { useNavigationStore } from "../../state/navigationStore";
import { useContentStore, ContentItem } from "../../state/contentStore";
import "./contentCard.scss";

interface ContentCardProps {
  item: ContentItem;
  onFocus: (layout: { x: number }) => void;
}

const ContentCard: React.FC<ContentCardProps> = ({ item, onFocus }) => {
  const { navigateTo } = useNavigationStore();
  const { selectContent } = useContentStore();

  const { ref, focused } = useFocusable({
    focusable: true,
    onEnterPress: () => {
      selectContent(item);
      navigateTo("detail");
    },
    onFocus
  });

  return (
    <div
      ref={ref}
      className={`content-card ${focused ? "focused" : ""}`}
    >
      <div className="card-image">
        <img src={item.imageUrl} alt={item.title} />
      </div>
      <div className="card-info">
        <h3 className="card-title">{item.title}</h3>
        {item.genre && <div className="card-genre">{item.genre}</div>}
      </div>
    </div>
  );
};

export default ContentCard;
