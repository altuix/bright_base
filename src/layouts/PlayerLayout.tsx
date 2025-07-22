import React, { useEffect, useState } from 'react';
import { FocusContext, useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { useNavigationStore } from '../state/navigationStore';
import { useContentStore } from '../state/contentStore';
import PlayerControls from '../components/Player/PlayerControls';
import { FOCUS_KEYS } from '../utils/navigation';
import '../styles/layouts/playerLayout.scss';

const PlayerLayout: React.FC = () => {
  const { focusKey } = useFocusable({
    focusable: true,
    saveLastFocusedChild: true,
    trackChildren: true,
    autoRestoreFocus: true,
    isFocusBoundary: false,
    focusKey: FOCUS_KEYS.APP
  });
  
  const { selectedContent } = useContentStore();
  const { navigateBack } = useNavigationStore();
  
  // Player state
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [progress, setProgress] = useState(0);
  
  // Auto-hide controls after a few seconds
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (showControls) {
      timeout = setTimeout(() => {
        setShowControls(false);
      }, 5000);
    }
    
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [showControls]);
  
  // Simulate playback progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && selectedContent?.duration) {
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 0.1;
          if (newProgress >= 100) {
            // End of content, go back to detail page
            navigateBack();
            return 0;
          }
          return newProgress;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, selectedContent, navigateBack]);
  
  // Handle key events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Show controls on any key press
      setShowControls(true);
      
      // Handle specific keys
      switch (event.key) {
        case 'Backspace':
        case 'Back':
          navigateBack();
          break;
        case 'Enter':
        case ' ': // Space
          setIsPlaying(prev => !prev);
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigateBack]);
  
  if (!selectedContent) {
    return (
      <div className="player-layout error">
        <div className="error-text">No content selected for playback</div>
        <button 
          className="back-button"
          onClick={() => navigateBack()}
        >
          Go Back
        </button>
      </div>
    );
  }
  
  return (
    <FocusContext.Provider value={focusKey}>
      <div className="player-layout">
        {/* Video placeholder */}
        <div className="video-container">
          <div className="video-placeholder">
            <img 
              src={selectedContent.imageUrl} 
              alt={selectedContent.title}
              className="video-frame"
            />
            {!isPlaying && (
              <div className="pause-indicator">
                <span className="pause-icon">⏸</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Player controls */}
        {showControls && (
          <PlayerControls 
            focusKey={FOCUS_KEYS.PLAYER_CONTROLS}
            isPlaying={isPlaying}
            progress={progress}
            content={selectedContent}
            onPlayPause={() => setIsPlaying(!isPlaying)}
            onBack={() => navigateBack()}
          />
        )}
      </div>
    </FocusContext.Provider>
  );
};

export default PlayerLayout;
