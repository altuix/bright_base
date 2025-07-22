import React from 'react';
import { FocusContext, useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { ContentItem } from '../../state/contentStore';
import './playerControls.scss';

interface PlayerControlsProps {
  focusKey: string;
  isPlaying: boolean;
  progress: number;
  content: ContentItem;
  onPlayPause: () => void;
  onBack: () => void;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  focusKey: focusKeyParam,
  isPlaying,
  progress,
  content,
  onPlayPause,
  onBack
}) => {
  const {
    ref,
    focusKey
  } = useFocusable({
    focusable: true,
    saveLastFocusedChild: true,
    trackChildren: true,
    autoRestoreFocus: true,
    isFocusBoundary: false,
    focusKey: focusKeyParam
  });

  // Calculate time display
  const formatTime = (percentage: number): string => {
    if (!content.duration) return '00:00';
    
    const totalSeconds = Math.floor((content.duration * 60) * (percentage / 100));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Calculate remaining time
  const formatRemainingTime = (percentage: number): string => {
    if (!content.duration) return '00:00';
    
    const totalSeconds = Math.floor((content.duration * 60) * (1 - percentage / 100));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    return `-${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <FocusContext.Provider value={focusKey}>
      <div className="player-controls" ref={ref}>
        <div className="content-info">
          <h2 className="title">{content.title}</h2>
          {content.type === 'series' && <span className="episode">S1:E1</span>}
        </div>
        
        <div className="progress-bar-container">
          <div className="time-display">{formatTime(progress)}</div>
          <div className="progress-bar">
            <div 
              className="progress-filled"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="time-remaining">{formatRemainingTime(progress)}</div>
        </div>
        
        <div className="control-buttons">
          <ControlButton
            icon="⏮"
            label="Previous"
            onEnterPress={() => {
              // In a real app, this would go to previous episode/chapter
              console.log('Previous');
            }}
          />
          
          <ControlButton
            icon="⏪"
            label="Rewind"
            onEnterPress={() => {
              // In a real app, this would rewind
              console.log('Rewind');
            }}
          />
          
          <ControlButton
            icon={isPlaying ? "⏸" : "▶"}
            label={isPlaying ? "Pause" : "Play"}
            onEnterPress={onPlayPause}
            primary
          />
          
          <ControlButton
            icon="⏩"
            label="Forward"
            onEnterPress={() => {
              // In a real app, this would fast forward
              console.log('Fast forward');
            }}
          />
          
          <ControlButton
            icon="⏭"
            label="Next"
            onEnterPress={() => {
              // In a real app, this would go to next episode/chapter
              console.log('Next');
            }}
          />
        </div>
        
        <div className="back-button-container">
          <ControlButton
            icon="✕"
            label="Back"
            onEnterPress={onBack}
          />
        </div>
      </div>
    </FocusContext.Provider>
  );
};

interface ControlButtonProps {
  icon: string;
  label: string;
  onEnterPress: () => void;
  primary?: boolean;
}

const ControlButton: React.FC<ControlButtonProps> = ({ 
  icon, 
  label, 
  onEnterPress,
  primary = false
}) => {
  const { ref, focused } = useFocusable({
    onEnterPress
  });

  return (
    <div
      ref={ref}
      className={`control-button ${focused ? 'focused' : ''} ${primary ? 'primary' : ''}`}
      title={label}
    >
      <div className="button-icon">{icon}</div>
    </div>
  );
};

export default PlayerControls;
