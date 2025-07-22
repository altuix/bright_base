import React from "react";
import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import { useNavigationStore } from "../../state/navigationStore";
import { ContentItem, useContentStore } from "../../state/contentStore";
import "./featuredContent.scss";

interface FeaturedContentProps {
  content: ContentItem;
}

const FeaturedContent: React.FC<FeaturedContentProps> = ({ content }) => {
  const { navigateTo } = useNavigationStore();
  const { selectContent } = useContentStore();

  const { ref, focused } = useFocusable({
    focusable: true,
    onEnterPress: () => {
      selectContent(content);
      navigateTo("detail");
    }
  });

  return (
    <div
      ref={ref}
      className={`featured-content ${focused ? "focused" : ""}`}
    >
      <div className="featured-backdrop">
        <img
          src={content.imageUrl}
          alt={content.title}
          className="featured-image"
        />
      </div>
      <div className="featured-info">
        <h2 className="featured-title">{content.title}</h2>
        {content.description && (
          <p className="featured-description">{content.description}</p>
        )}
        <div className="featured-meta">
          {content.genre && <span className="featured-genre">{content.genre}</span>}
          {content.duration && (
            <span className="featured-duration">{content.duration} min</span>
          )}
        </div>
        <div className="featured-actions">
          <button className="play-button">Play</button>
          <button className="info-button">More Info</button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedContent;
