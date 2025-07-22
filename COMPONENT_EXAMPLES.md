# BrightBase CTV Navigasyon Sistemi Bileşen Örnekleri

Bu dosya, BrightBase CTV uygulamasında kullanılacak navigasyonel bileşenlerin örnek implementasyonlarını içerir. Navigasyonel olan ve olmayan bileşenler arasındaki farkları, grup içi navigasyon mantığını ve farklı kullanım senaryolarını göstermektedir.

## Temel Navigasyonel Bileşenler

### 1. Basit Odaklanabilir Öğe (FocusableItem)

```tsx
// src/components/common/FocusableItem.tsx
import React, { useRef, useEffect } from 'react';
import { useFocus } from '../../hooks/useFocus';

interface FocusableItemProps {
  focusKey: string;
  children: React.ReactNode;
  className?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onEnter?: () => void;
}

export const FocusableItem: React.FC<FocusableItemProps> = ({
  focusKey,
  children,
  className = '',
  onFocus,
  onBlur,
  onEnter,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { isFocused, registerFocusable } = useFocus(focusKey);
  
  useEffect(() => {
    if (ref.current) {
      registerFocusable(focusKey, ref.current, { onFocus, onBlur, onEnter });
    }
    
    return () => {
      // Cleanup on unmount
    };
  }, [focusKey, onFocus, onBlur, onEnter, registerFocusable]);

  return (
    <div 
      ref={ref}
      className={`focusable-item ${isFocused ? 'focused' : ''} ${className}`}
      data-focus-key={focusKey}
    >
      {children}
    </div>
  );
};
```

### 2. Navigasyonel Olmayan Bileşen (NonFocusable)

```tsx
// src/components/common/NonFocusable.tsx
import React from 'react';

interface NonFocusableProps {
  children: React.ReactNode;
  className?: string;
}

export const NonFocusable: React.FC<NonFocusableProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`non-focusable ${className}`}>
      {children}
    </div>
  );
};
```

## Grup İçi Navigasyon

### 3. Odak Grubu (FocusGroup)

```tsx
// src/components/common/FocusGroup.tsx
import React, { useRef, useEffect } from 'react';
import { useFocusGroup } from '../../hooks/useFocusGroup';

interface FocusGroupProps {
  groupId: string;
  direction: 'horizontal' | 'vertical' | 'grid';
  children: React.ReactNode;
  className?: string;
  preferredChildFocusKey?: string;
  onFocusEnter?: () => void;
  onFocusLeave?: () => void;
}

export const FocusGroup: React.FC<FocusGroupProps> = ({
  groupId,
  direction,
  children,
  className = '',
  preferredChildFocusKey,
  onFocusEnter,
  onFocusLeave,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { registerGroup } = useFocusGroup();
  
  useEffect(() => {
    if (ref.current) {
      registerGroup(groupId, {
        element: ref.current,
        direction,
        preferredChildFocusKey,
        onFocusEnter,
        onFocusLeave
      });
    }
    
    return () => {
      // Cleanup on unmount
    };
  }, [groupId, direction, preferredChildFocusKey, onFocusEnter, onFocusLeave, registerGroup]);

  return (
    <div 
      ref={ref}
      className={`focus-group focus-group-${direction} ${className}`}
      data-focus-group-id={groupId}
    >
      {children}
    </div>
  );
};
```

## Gerçek Kullanım Örnekleri

### 4. Ana Menü Navigasyonu

```tsx
// Örnek Ana Menü Kullanımı
import React from 'react';
import { FocusGroup } from '../common/FocusGroup';
import { FocusableItem } from '../common/FocusableItem';
import { NonFocusable } from '../common/NonFocusable';

export const MainMenu: React.FC = () => {
  const handleMenuItemSelect = (menuItem: string) => {
    console.log(`Selected menu item: ${menuItem}`);
    // Navigate to the selected section
  };

  return (
    <FocusGroup 
      groupId="main-menu" 
      direction="horizontal" 
      className="main-menu-container"
      preferredChildFocusKey="home"
    >
      <FocusableItem 
        focusKey="home" 
        onEnter={() => handleMenuItemSelect('home')}
      >
        <div className="menu-item">
          <span className="icon home-icon"></span>
          <span className="label">Ana Sayfa</span>
        </div>
      </FocusableItem>
      
      <FocusableItem 
        focusKey="movies" 
        onEnter={() => handleMenuItemSelect('movies')}
      >
        <div className="menu-item">
          <span className="icon movie-icon"></span>
          <span className="label">Filmler</span>
        </div>
      </FocusableItem>
      
      <FocusableItem 
        focusKey="series" 
        onEnter={() => handleMenuItemSelect('series')}
      >
        <div className="menu-item">
          <span className="icon series-icon"></span>
          <span className="label">Diziler</span>
        </div>
      </FocusableItem>
      
      <NonFocusable className="menu-separator">
        <div className="separator-line"></div>
      </NonFocusable>
      
      <FocusableItem 
        focusKey="search" 
        onEnter={() => handleMenuItemSelect('search')}
      >
        <div className="menu-item">
          <span className="icon search-icon"></span>
          <span className="label">Arama</span>
        </div>
      </FocusableItem>
    </FocusGroup>
  );
};
```

### 5. İçerik Izgarası (Content Grid)

```tsx
// Örnek İçerik Izgarası Kullanımı
import React from 'react';
import { FocusGroup } from '../common/FocusGroup';
import { FocusableItem } from '../common/FocusableItem';
import { NonFocusable } from '../common/NonFocusable';

interface ContentItem {
  id: string;
  title: string;
  imageUrl: string;
}

interface ContentGridProps {
  items: ContentItem[];
  title: string;
}

export const ContentGrid: React.FC<ContentGridProps> = ({ items, title }) => {
  const handleItemSelect = (item: ContentItem) => {
    console.log(`Selected item: ${item.title}`);
    // Open detail panel or play content
  };

  return (
    <div className="content-section">
      <NonFocusable className="section-header">
        <h2>{title}</h2>
      </NonFocusable>
      
      <FocusGroup 
        groupId={`grid-${title.toLowerCase().replace(/\s+/g, '-')}`} 
        direction="horizontal" 
        className="content-grid"
      >
        {items.map((item) => (
          <FocusableItem 
            key={item.id}
            focusKey={`content-${item.id}`}
            onEnter={() => handleItemSelect(item)}
            className="content-card"
          >
            <div className="card-inner">
              <img src={item.imageUrl} alt={item.title} className="card-image" />
              <div className="card-info">
                <h3 className="card-title">{item.title}</h3>
              </div>
            </div>
          </FocusableItem>
        ))}
      </FocusGroup>
    </div>
  );
};
```

### 6. Detay Paneli ve Oynatma Kontrolleri

```tsx
// Örnek Detay Paneli Kullanımı
import React from 'react';
import { FocusGroup } from '../common/FocusGroup';
import { FocusableItem } from '../common/FocusableItem';
import { NonFocusable } from '../common/NonFocusable';

interface DetailPanelProps {
  title: string;
  description: string;
  imageUrl: string;
  duration: string;
  year: number;
  onPlay: () => void;
  onClose: () => void;
}

export const DetailPanel: React.FC<DetailPanelProps> = ({
  title,
  description,
  imageUrl,
  duration,
  year,
  onPlay,
  onClose
}) => {
  return (
    <div className="detail-panel">
      <NonFocusable className="detail-background">
        <div className="background-image" style={{ backgroundImage: `url(${imageUrl})` }}></div>
        <div className="gradient-overlay"></div>
      </NonFocusable>
      
      <div className="detail-content">
        <NonFocusable className="detail-info">
          <h1 className="detail-title">{title}</h1>
          <div className="detail-meta">
            <span className="year">{year}</span>
            <span className="duration">{duration}</span>
          </div>
          <p className="detail-description">{description}</p>
        </NonFocusable>
        
        <FocusGroup 
          groupId="detail-actions" 
          direction="horizontal" 
          className="detail-actions"
          preferredChildFocusKey="play"
        >
          <FocusableItem 
            focusKey="play" 
            onEnter={onPlay}
            className="action-button primary"
          >
            <span className="icon play-icon"></span>
            <span className="label">Oynat</span>
          </FocusableItem>
          
          <FocusableItem 
            focusKey="trailer" 
            className="action-button secondary"
          >
            <span className="icon trailer-icon"></span>
            <span className="label">Fragman</span>
          </FocusableItem>
          
          <FocusableItem 
            focusKey="add" 
            className="action-button secondary"
          >
            <span className="icon add-icon"></span>
            <span className="label">Listeme Ekle</span>
          </FocusableItem>
          
          <FocusableItem 
            focusKey="close" 
            onEnter={onClose}
            className="action-button close"
          >
            <span className="icon close-icon"></span>
          </FocusableItem>
        </FocusGroup>
      </div>
    </div>
  );
};
```

### 7. Video Oynatıcı Kontrolleri

```tsx
// Örnek Video Oynatıcı Kontrolleri
import React, { useState } from 'react';
import { FocusGroup } from '../common/FocusGroup';
import { FocusableItem } from '../common/FocusableItem';
import { NonFocusable } from '../common/NonFocusable';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  onBack: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  title,
  onBack
}) => {
  const [showControls, setShowControls] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    // Implement actual video play/pause logic
  };
  
  const handleSeek = (direction: 'forward' | 'backward') => {
    console.log(`Seeking ${direction}`);
    // Implement actual seeking logic
  };

  return (
    <div className="video-player-container">
      <video 
        src={videoUrl} 
        className="video-element" 
        autoPlay
      />
      
      {showControls && (
        <div className="player-overlay">
          <NonFocusable className="video-title">
            <h2>{title}</h2>
          </NonFocusable>
          
          <FocusGroup 
            groupId="player-controls" 
            direction="horizontal" 
            className="player-controls"
            preferredChildFocusKey="play-pause"
          >
            <FocusableItem 
              focusKey="back" 
              onEnter={onBack}
              className="control-button"
            >
              <span className="icon back-icon"></span>
            </FocusableItem>
            
            <FocusableItem 
              focusKey="rewind" 
              onEnter={() => handleSeek('backward')}
              className="control-button"
            >
              <span className="icon rewind-icon"></span>
            </FocusableItem>
            
            <FocusableItem 
              focusKey="play-pause" 
              onEnter={togglePlayPause}
              className="control-button primary"
            >
              <span className={`icon ${isPlaying ? 'pause-icon' : 'play-icon'}`}></span>
            </FocusableItem>
            
            <FocusableItem 
              focusKey="forward" 
              onEnter={() => handleSeek('forward')}
              className="control-button"
            >
              <span className="icon forward-icon"></span>
            </FocusableItem>
            
            <FocusableItem 
              focusKey="settings" 
              className="control-button"
            >
              <span className="icon settings-icon"></span>
            </FocusableItem>
          </FocusGroup>
          
          <NonFocusable className="progress-bar-container">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '35%' }}></div>
            </div>
            <div className="time-display">
              <span className="current-time">00:15:30</span>
              <span className="duration">00:45:10</span>
            </div>
          </NonFocusable>
        </div>
      )}
    </div>
  );
};
```

## Karmaşık Navigasyon Senaryoları

### 8. Çoklu Grup Navigasyonu (Ana Sayfa Düzeni)

```tsx
// Örnek Ana Sayfa Düzeni
import React from 'react';
import { FocusGroup } from '../common/FocusGroup';
import { FocusableItem } from '../common/FocusableItem';
import { NonFocusable } from '../common/NonFocusable';
import { MainMenu } from './MainMenu';
import { ContentGrid } from './ContentGrid';

// Örnek veri
const featuredContent = [
  { id: 'f1', title: 'Öne Çıkan 1', imageUrl: '/images/featured1.jpg' },
  { id: 'f2', title: 'Öne Çıkan 2', imageUrl: '/images/featured2.jpg' },
  { id: 'f3', title: 'Öne Çıkan 3', imageUrl: '/images/featured3.jpg' },
];

const trendingContent = [
  { id: 't1', title: 'Trend 1', imageUrl: '/images/trend1.jpg' },
  { id: 't2', title: 'Trend 2', imageUrl: '/images/trend2.jpg' },
  { id: 't3', title: 'Trend 3', imageUrl: '/images/trend3.jpg' },
  { id: 't4', title: 'Trend 4', imageUrl: '/images/trend4.jpg' },
  { id: 't5', title: 'Trend 5', imageUrl: '/images/trend5.jpg' },
];

const newReleases = [
  { id: 'n1', title: 'Yeni 1', imageUrl: '/images/new1.jpg' },
  { id: 'n2', title: 'Yeni 2', imageUrl: '/images/new2.jpg' },
  { id: 'n3', title: 'Yeni 3', imageUrl: '/images/new3.jpg' },
  { id: 'n4', title: 'Yeni 4', imageUrl: '/images/new4.jpg' },
];

export const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      {/* Üst menü - yatay navigasyon */}
      <MainMenu />
      
      <div className="content-area">
        {/* Öne çıkan içerik - büyük banner */}
        <FocusGroup 
          groupId="featured" 
          direction="horizontal" 
          className="featured-content"
        >
          {featuredContent.map((item) => (
            <FocusableItem 
              key={item.id}
              focusKey={`featured-${item.id}`}
              className="featured-item"
            >
              <img src={item.imageUrl} alt={item.title} className="featured-image" />
              <div className="featured-info">
                <h2>{item.title}</h2>
                <FocusableItem 
                  focusKey={`featured-play-${item.id}`}
                  className="play-button"
                >
                  Oynat
                </FocusableItem>
              </div>
            </FocusableItem>
          ))}
        </FocusGroup>
        
        {/* Trend içerik - yatay kaydırılabilir liste */}
        <ContentGrid items={trendingContent} title="Trendler" />
        
        {/* Yeni çıkanlar - yatay kaydırılabilir liste */}
        <ContentGrid items={newReleases} title="Yeni Çıkanlar" />
      </div>
    </div>
  );
};
```

### 9. Arama Sayfası ve Sanal Klavye

```tsx
// Örnek Arama Sayfası ve Sanal Klavye
import React, { useState } from 'react';
import { FocusGroup } from '../common/FocusGroup';
import { FocusableItem } from '../common/FocusableItem';
import { NonFocusable } from '../common/NonFocusable';

export const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleKeyPress = (key: string) => {
    if (key === 'backspace') {
      setSearchQuery(prev => prev.slice(0, -1));
    } else if (key === 'space') {
      setSearchQuery(prev => prev + ' ');
    } else if (key === 'clear') {
      setSearchQuery('');
    } else {
      setSearchQuery(prev => prev + key);
    }
  };
  
  // Sanal klavye düzeni
  const keyboardRows = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
  ];

  return (
    <div className="search-page">
      <NonFocusable className="search-header">
        <h1>Arama</h1>
      </NonFocusable>
      
      <NonFocusable className="search-input-display">
        <div className="search-box">
          <span className="search-icon"></span>
          <div className="search-text">{searchQuery || 'Aramak için bir şey yazın...'}</div>
          <div className="search-cursor"></div>
        </div>
      </NonFocusable>
      
      <div className="virtual-keyboard">
        {keyboardRows.map((row, rowIndex) => (
          <FocusGroup 
            key={`row-${rowIndex}`}
            groupId={`keyboard-row-${rowIndex}`} 
            direction="horizontal" 
            className="keyboard-row"
          >
            {row.map((key) => (
              <FocusableItem 
                key={key}
                focusKey={`key-${key}`}
                onEnter={() => handleKeyPress(key)}
                className="keyboard-key"
              >
                {key.toUpperCase()}
              </FocusableItem>
            ))}
          </FocusGroup>
        ))}
        
        <FocusGroup 
          groupId="keyboard-actions" 
          direction="horizontal" 
          className="keyboard-actions"
        >
          <FocusableItem 
            focusKey="key-space"
            onEnter={() => handleKeyPress('space')}
            className="keyboard-key wide-key"
          >
            BOŞLUK
          </FocusableItem>
          
          <FocusableItem 
            focusKey="key-backspace"
            onEnter={() => handleKeyPress('backspace')}
            className="keyboard-key action-key"
          >
            SİL
          </FocusableItem>
          
          <FocusableItem 
            focusKey="key-clear"
            onEnter={() => handleKeyPress('clear')}
            className="keyboard-key action-key"
          >
            TEMIZLE
          </FocusableItem>
          
          <FocusableItem 
            focusKey="key-search"
            className="keyboard-key primary-key"
          >
            ARA
          </FocusableItem>
        </FocusGroup>
      </div>
      
      {searchQuery && (
        <NonFocusable className="search-suggestions">
          <h3>Öneriler</h3>
          <FocusGroup 
            groupId="search-suggestions" 
            direction="vertical" 
            className="suggestions-list"
          >
            <FocusableItem 
              focusKey="suggestion-1"
              className="suggestion-item"
            >
              {searchQuery} ile ilgili öneri 1
            </FocusableItem>
            <FocusableItem 
              focusKey="suggestion-2"
              className="suggestion-item"
            >
              {searchQuery} ile ilgili öneri 2
            </FocusableItem>
          </FocusGroup>
        </NonFocusable>
      )}
    </div>
  );
};
```

## CSS Stilleri (Örnek)

```css
/* Navigasyonel bileşenler için örnek CSS */

/* Temel odaklanabilir öğe */
.focusable-item {
  position: relative;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.focusable-item.focused {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(0, 123, 255, 0.7);
  z-index: 10;
  outline: 3px solid #007bff;
}

/* Odak grupları */
.focus-group {
  display: flex;
}

.focus-group-horizontal {
  flex-direction: row;
  overflow-x: auto;
  overflow-y: hidden;
}

.focus-group-vertical {
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
}

.focus-group-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

/* İçerik kartları */
.content-card {
  margin: 10px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #1a1a1a;
}

.content-card.focused .card-inner {
  border: 3px solid #007bff;
}

.card-image {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
}

.card-info {
  padding: 10px;
}

.card-title {
  margin: 0;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Ana menü */
.main-menu-container {
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.7);
}

.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 20px;
}

.menu-item .icon {
  font-size: 24px;
  margin-bottom: 5px;
}

.menu-separator {
  width: 1px;
  height: 40px;
  margin: 0 10px;
}

.separator-line {
  height: 100%;
  width: 1px;
  background-color: rgba(255, 255, 255, 0.2);
}

/* Oynatıcı kontrolleri */
.player-controls {
  position: absolute;
  bottom: 60px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 20px;
}

.control-button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.control-button.primary {
  width: 70px;
  height: 70px;
}

.control-button.focused {
  background-color: #007bff;
  transform: scale(1.1);
}

/* İlerleme çubuğu */
.progress-bar-container {
  position: absolute;
  bottom: 20px;
  left: 5%;
  right: 5%;
}

.progress-bar {
  height: 5px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #007bff;
}

.time-display {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
}
```
