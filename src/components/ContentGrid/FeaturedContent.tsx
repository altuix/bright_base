import React from 'react';
import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { useNavigationStore } from '../../state/navigationStore';
import { ContentItem } from '../../state/contentStore';
import './featuredContent.scss';

interface FeaturedContentProps {
  content: ContentItem;
}

const FeaturedContent: React.FC<FeaturedContentProps> = ({ content }) => {
  const { ref, focused } = useFocusable({
    focusable: true,
    onEnterPress: () => {
      console.log(`FeaturedContent: Enter pressed on ${content.title}`);
      // Navigate to detail page
      navigateTo('detail');
    },
    onFocus: () => {
      console.log(`FeaturedContent: ${content.title} focused`);
    },
    onBlur: () => {
      console.log(`FeaturedContent: ${content.title} blurred`);
    },
    onArrowPress: (direction: string) => {
      console.log(`FeaturedContent: Arrow ${direction} pressed on ${content.title}`);
      return true; // Let the library handle the navigation
    }
  });

  const { navigateTo } = useNavigationStore();

  return (
    <div 
      ref={ref}
      className={`featured-content ${focused ? 'focused' : ''}`}
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8)), url(${content.imageUrl})` 
      }}
    >
      <div className="featured-info">
        <h1 className="featured-title">{content.title}</h1>
        {content.description && (
          <p className="featured-description">{content.description}</p>
        )}
        <div className="featured-metadata">
          {content.genre && <span className="genre">{content.genre}</span>}
          {content.duration && (
            <span className="duration">
              {Math.floor(content.duration / 60)}h {content.duration % 60}m
            </span>
          )}
          {content.rating && <span className="rating">★ {content.rating.toFixed(1)}</span>}
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
