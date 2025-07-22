import { create } from 'zustand';

interface AuthState {
  // Authentication status
  isAuthenticated: boolean;
  // User information
  user: {
    id: string | null;
    name: string | null;
    preferences: Record<string, any>;
  };
  // Auth actions
  checkAuth: () => void;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUserPreferences: (preferences: Record<string, any>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: {
    id: null,
    name: null,
    preferences: {}
  },
  
  // Check if user is authenticated (e.g., from local storage or device storage)
  checkAuth: () => {
    // In a real app, you would check local storage or make an API call
    // For this boilerplate, we'll just simulate it
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        set({ isAuthenticated: true, user: parsedUser });
      } catch (e) {
        // Invalid stored user data
        localStorage.removeItem('user');
      }
    }
  },
  
  // Login functionality
  login: async (username, password) => {
    try {
      // In a real app, you would make an API call here
      // For this boilerplate, we'll simulate a successful login
      const mockUser = {
        id: '123',
        name: username,
        preferences: {
          subtitles: true,
          audioLanguage: 'en'
        }
      };
      
      // Save user to local storage
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      // Update state
      set({ isAuthenticated: true, user: mockUser });
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  },
  
  // Logout functionality
  logout: () => {
    // Clear local storage
    localStorage.removeItem('user');
    
    // Update state
    set({
      isAuthenticated: false,
      user: {
        id: null,
        name: null,
        preferences: {}
      }
    });
  },
  
  // Update user preferences
  updateUserPreferences: (preferences) => {
    set((state) => {
      const updatedUser = {
        ...state.user,
        preferences: {
          ...state.user.preferences,
          ...preferences
        }
      };
      
      // Save updated user to local storage
      if (state.isAuthenticated) {
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      return { user: updatedUser };
    });
  }
}));
