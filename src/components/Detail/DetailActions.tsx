import React from 'react';
import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { ContentItem } from '../../state/contentStore';
import './detailActions.scss';

interface DetailActionsProps {
  focusKey: string;
  content: ContentItem;
}

const DetailActions: React.FC<DetailActionsProps> = ({ focusKey: focusKeyParam, content }) => {
  const { ref, focusKey } = useFocusable({
    focusable: true,
    saveLastFocusedChild: true,
    trackChildren: true,
    focusKey: focusKeyParam
  });

  return (
    <div ref={ref} className="detail-actions">
      <button className="action-button primary">
        {content.type === 'movie' ? 'Play Movie' : content.type === 'series' ? 'Watch Episodes' : 'Watch Now'}
      </button>
      <button className="action-button">Add to Watchlist</button>
      <button className="action-button">More Info</button>
    </div>
  );
};

export default DetailActions;
