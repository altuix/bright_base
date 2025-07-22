import React from 'react';
import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { useNavigationStore } from '../../state/navigationStore';
import { useContentStore } from '../../state/contentStore';
import { ContentItem } from '../../state/contentStore';
import './contentCard.scss';

interface ContentCardProps {
  content: ContentItem;
  onFocus: (layout: any) => void;
  focusKey: string;
}

const ContentCard: React.FC<ContentCardProps> = ({ content, onFocus, focusKey }) => {
  const handleFocus = React.useCallback((props: any) => {
    console.log(`ContentCard (${content.title}): Focused`);
    if (onFocus) {
      onFocus(props);
    }
  }, [content.title, onFocus]);

  const { ref, focused } = useFocusable({
    focusable: true,
    focusKey,
    onFocus: handleFocus,
    onBlur: () => {
      console.log(`ContentCard (${content.title}): Blurred`);
    },
    onEnterPress: () => {
      console.log(`ContentCard: Enter pressed on ${content.title}`);
      // Select this content and navigate to detail page
      selectContent(content);
      navigateTo('detail');
    },
    onArrowPress: (direction: string) => {
      console.log(`ContentCard (${content.title}): Arrow ${direction} pressed`);
      return true; // Let the library handle the navigation
    },
    extraProps: {
      id: content.id
    }
  });

  const { navigateTo } = useNavigationStore();
  const { selectContent } = useContentStore();

  return (
    <div 
      ref={ref}
      className={`content-card ${focused ? 'focused' : ''}`}
      data-testid="content-card"
    >
      <div className="card-image-container">
        <img 
          src={content.imageUrl} 
          alt={content.title} 
          className="card-image"
        />
        {content.type === 'live' && (
          <div className="live-badge">LIVE</div>
        )}
      </div>
      <div className="card-info">
        <h3 className="card-title">{content.title}</h3>
        {content.rating && (
          <div className="card-rating">★ {content.rating.toFixed(1)}</div>
        )}
      </div>
    </div>
  );
};

export default ContentCard;
