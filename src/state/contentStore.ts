import { create } from 'zustand';

// Content item interface
export interface ContentItem {
  id: string;
  title: string;
  imageUrl: string;
  type: 'movie' | 'series' | 'live';
  genre?: string;
  description?: string;
  duration?: number;
  rating?: number;
}

// Content row interface
export interface ContentRow {
  id: string;
  title: string;
  items: ContentItem[];
}

interface ContentState {
  // Content data
  featuredContent: ContentItem | null;
  contentRows: ContentRow[];
  selectedContent: ContentItem | null;
  isLoading: boolean;
  error: string | null;
  
  // Content actions
  fetchHomeContent: () => Promise<void>;
  fetchContentDetails: (contentId: string) => Promise<void>;
  selectContent: (content: ContentItem) => void;
}

export const useContentStore = create<ContentState>((set, get) => ({
  featuredContent: null,
  contentRows: [],
  selectedContent: null,
  isLoading: false,
  error: null,
  
  // Fetch home page content
  fetchHomeContent: async () => {
    try {
      set({ isLoading: true, error: null });
      
      // In a real app, you would fetch from an API
      // For this boilerplate, we'll use mock data
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock featured content
      const mockFeatured: ContentItem = {
        id: 'featured1',
        title: 'Featured Title',
        imageUrl: 'https://via.placeholder.com/1280x720',
        type: 'movie',
        genre: 'Action',
        description: 'This is a featured movie with an exciting plot.',
        duration: 120,
        rating: 4.5
      };
      
      // Mock content rows
      const mockRows: ContentRow[] = [
        {
          id: 'trending',
          title: 'Trending Now',
          items: Array(10).fill(0).map((_, i) => ({
            id: `trending-${i}`,
            title: `Trending Title ${i + 1}`,
            imageUrl: `https://via.placeholder.com/400x225?text=Trending+${i + 1}`,
            type: i % 3 === 0 ? 'series' : 'movie',
            rating: 3 + Math.random() * 2
          }))
        },
        {
          id: 'recommended',
          title: 'Recommended For You',
          items: Array(10).fill(0).map((_, i) => ({
            id: `recommended-${i}`,
            title: `Recommended Title ${i + 1}`,
            imageUrl: `https://via.placeholder.com/400x225?text=Recommended+${i + 1}`,
            type: i % 2 === 0 ? 'movie' : 'series',
            rating: 3 + Math.random() * 2
          }))
        },
        {
          id: 'new',
          title: 'New Releases',
          items: Array(10).fill(0).map((_, i) => ({
            id: `new-${i}`,
            title: `New Release ${i + 1}`,
            imageUrl: `https://via.placeholder.com/400x225?text=New+${i + 1}`,
            type: 'movie',
            rating: 3 + Math.random() * 2
          }))
        },
        {
          id: 'live',
          title: 'Live Now',
          items: Array(10).fill(0).map((_, i) => ({
            id: `live-${i}`,
            title: `Live Channel ${i + 1}`,
            imageUrl: `https://via.placeholder.com/400x225?text=Live+${i + 1}`,
            type: 'live'
          }))
        }
      ];
      
      set({
        featuredContent: mockFeatured,
        contentRows: mockRows,
        isLoading: false
      });
    } catch (error) {
      console.error('Failed to fetch home content:', error);
      set({
        isLoading: false,
        error: 'Failed to load content. Please try again.'
      });
    }
  },
  
  // Fetch details for a specific content item
  fetchContentDetails: async (contentId: string) => {
    try {
      set({ isLoading: true, error: null });
      
      // In a real app, you would fetch from an API
      // For this boilerplate, we'll search in existing content or use mock data
      
      // First try to find in existing content
      const { contentRows } = get();
      let foundContent: ContentItem | undefined;
      
      // Check in all rows
      for (const row of contentRows) {
        foundContent = row.items.find(item => item.id === contentId);
        if (foundContent) break;
      }
      
      // If not found, create mock data
      if (!foundContent) {
        foundContent = {
          id: contentId,
          title: `Content ${contentId}`,
          imageUrl: `https://via.placeholder.com/1280x720?text=Content+${contentId}`,
          type: Math.random() > 0.5 ? 'movie' : 'series',
          genre: 'Drama',
          description: 'This is a detailed description of the content.',
          duration: 90 + Math.floor(Math.random() * 60),
          rating: 3 + Math.random() * 2
        };
      }
      
      // Add more details that might not be in the list view
      const detailedContent = {
        ...foundContent,
        description: foundContent.description || 'No description available.',
        cast: ['Actor 1', 'Actor 2', 'Actor 3'],
        director: 'Director Name',
        releaseYear: 2020 + Math.floor(Math.random() * 3),
        episodes: foundContent.type === 'series' ? Array(8).fill(0).map((_, i) => ({
          id: `${contentId}-ep-${i}`,
          title: `Episode ${i + 1}`,
          duration: 30 + Math.floor(Math.random() * 30),
          thumbnail: `https://via.placeholder.com/400x225?text=Episode+${i + 1}`
        })) : undefined
      };
      
      set({
        selectedContent: detailedContent,
        isLoading: false
      });
    } catch (error) {
      console.error('Failed to fetch content details:', error);
      set({
        isLoading: false,
        error: 'Failed to load content details. Please try again.'
      });
    }
  },
  
  // Select a content item
  selectContent: (content: ContentItem) => {
    set({ selectedContent: content });
  }
}));
