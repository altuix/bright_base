import React from 'react';
import { FocusContext, useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { useNavigationStore } from '../../state/navigationStore';
import { ContentItem } from '../../state/contentStore';
import './detailActions.scss';

interface DetailActionsProps {
  focusKey: string;
  content: ContentItem;
}

const DetailActions: React.FC<DetailActionsProps> = ({ focusKey: focusKeyParam, content }) => {
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

  const { navigateTo } = useNavigationStore();

  // Action buttons with their handlers
  const actions = [
    {
      id: 'play',
      label: 'Play',
      icon: '▶',
      onEnterPress: () => {
        navigateTo('player');
      }
    },
    {
      id: 'trailer',
      label: 'Trailer',
      icon: '🎬',
      onEnterPress: () => {
        // In a real app, this would play the trailer
        console.log('Play trailer for', content.title);
      }
    },
    {
      id: 'watchlist',
      label: 'Add to Watchlist',
      icon: '+',
      onEnterPress: () => {
        // In a real app, this would add to watchlist
        console.log('Add to watchlist:', content.title);
      }
    },
    {
      id: 'similar',
      label: 'Similar',
      icon: '≈',
      onEnterPress: () => {
        // In a real app, this would show similar content
        console.log('Show similar to:', content.title);
      }
    }
  ];

  return (
    <FocusContext.Provider value={focusKey}>
      <div className="detail-actions" ref={ref}>
        {actions.map((action) => (
          <ActionButton
            key={action.id}
            label={action.label}
            icon={action.icon}
            onEnterPress={action.onEnterPress}
          />
        ))}
      </div>
    </FocusContext.Provider>
  );
};

interface ActionButtonProps {
  label: string;
  icon: string;
  onEnterPress: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ label, icon, onEnterPress }) => {
  const { ref, focused } = useFocusable({
    onEnterPress,
    focusable: true
  });

  return (
    <div
      ref={ref}
      className={`action-button ${focused ? 'focused' : ''}`}
    >
      <div className="button-icon">{icon}</div>
      <div className="button-label">{label}</div>
    </div>
  );
};

export default DetailActions;
