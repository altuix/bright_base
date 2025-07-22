import React, { useEffect } from 'react';
import { FocusContext, useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { useNavigationStore } from '../state/navigationStore';
import { useContentStore, ContentItem } from '../state/contentStore';
import DetailActions from '../components/Detail/DetailActions';
import { FOCUS_KEYS } from '../utils/navigation';
import '../styles/layouts/detailLayout.scss';

const DetailLayout: React.FC = () => {
  const { ref, focusKey } = useFocusable({
    focusable: true,
    saveLastFocusedChild: true,
    trackChildren: true,
    autoRestoreFocus: true,
    isFocusBoundary: false,
    focusKey: FOCUS_KEYS.DETAIL_LAYOUT
  });
  
  const { selectedContent, isLoading } = useContentStore();
  const { navigateBack } = useNavigationStore();
  
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
  
  if (isLoading) {
    return (
      <FocusContext.Provider value={focusKey}>
        <div ref={ref} className="detail-layout loading">
          <div className="loading-text">Loading content details...</div>
        </div>
      </FocusContext.Provider>
    );
  }
  
  if (!selectedContent) {
    return (
      <FocusContext.Provider value={focusKey}>
        <div ref={ref} className="detail-layout error">
          <div className="error-text">Content not found</div>
          <button 
            className="back-button"
            onClick={() => navigateBack()}
          >
            Go Back
          </button>
        </div>
      </FocusContext.Provider>
    );
  }
  
  return (
    <FocusContext.Provider value={focusKey}>
      <div 
        ref={ref}
        className="detail-layout"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url(${selectedContent.imageUrl})` 
        }}
      >
        <div className="detail-content">
          <h1 className="title">{selectedContent.title}</h1>
          
          <div className="metadata">
            {selectedContent.genre && <span className="genre">{selectedContent.genre}</span>}
            {selectedContent.duration && (
              <span className="duration">{Math.floor(selectedContent.duration / 60)}h {selectedContent.duration % 60}m</span>
            )}
            {selectedContent.rating && <span className="rating">★ {selectedContent.rating.toFixed(1)}</span>}
          </div>
          
          <p className="description">{selectedContent.description}</p>
          
          <DetailActions focusKey={FOCUS_KEYS.DETAIL_ACTIONS} content={selectedContent as ContentItem} />
        </div>
      </div>
    </FocusContext.Provider>
  );
};

export default DetailLayout;
