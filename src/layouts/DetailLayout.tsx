import React, { useEffect } from 'react';
import { FocusContext, useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { useNavigationStore } from '../state/navigationStore';
import { useContentStore, ContentItem } from '../state/contentStore';
import DetailActions from '../components/Detail/DetailActions';
import { FOCUS_KEYS } from '../utils/navigation';
import '../styles/layouts/detailLayout.scss';

const DetailLayout: React.FC = () => {
  const { ref, focusKey, focusSelf } = useFocusable({
    focusable: true,
    saveLastFocusedChild: false,
    trackChildren: true,
    autoRestoreFocus: true,
    focusKey: FOCUS_KEYS.DETAIL_LAYOUT
  });
  
  const { selectedContent } = useContentStore();
  const { navigateBack } = useNavigationStore();
  
  // Focus self when component mounts
  useEffect(() => {
    focusSelf();
  }, [focusSelf]);
  
  // Handle back button
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Backspace' || event.key === 'Back') {
        navigateBack();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigateBack]);
  
  // Default content if none selected
  const defaultContent: ContentItem = {
    id: 'default',
    title: 'Sample Content',
    genre: 'Action',
    description: 'This is a sample content description. Select content from the main page to see details.',
    imageUrl: 'https://via.placeholder.com/1280x720/333333/FFFFFF?text=Sample+Content',
    type: 'movie',
    duration: 120,
    rating: 5.0
  };
  
  const content = selectedContent || defaultContent;
  
  return (
    <FocusContext.Provider value={focusKey}>
      <div 
        ref={ref}
        className="detail-layout"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url(${content.imageUrl})` 
        }}
      >
        <div className="detail-content">
          <h1 className="title">{content.title}</h1>
          
          <div className="metadata">
            {content.genre && <span className="genre">{content.genre}</span>}
            {content.duration && (
              <span className="duration">{Math.floor(content.duration / 60)}h {content.duration % 60}m</span>
            )}
            {content.rating && <span className="rating">★ {content.rating.toFixed(1)}</span>}
          </div>
          
          <p className="description">{content.description}</p>
          
          <DetailActions focusKey={FOCUS_KEYS.DETAIL_ACTIONS} content={content as ContentItem} />
          
          <button 
            className="back-button"
            onClick={() => navigateBack()}
          >
            Go Back
          </button>
        </div>
      </div>
    </FocusContext.Provider>
  );
};

export default DetailLayout;
