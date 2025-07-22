/**
 * API Service
 * Handles all API requests to the backend
 */

// Base API URL - would be replaced with actual API URL in a real app
const API_BASE_URL = 'https://api.example.com/v1';

// Default request options
const defaultOptions: RequestInit = {
  headers: {
    'Content-Type': 'application/json'
  }
};

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    // Try to get error message from response
    let errorMessage = 'An error occurred';
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (e) {
      // If we can't parse the error, use status text
      errorMessage = response.statusText;
    }
    
    throw new Error(`API Error (${response.status}): ${errorMessage}`);
  }
  
  // Check if response has content
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  
  return response.text();
};

// Generic fetch function with error handling
const fetchApi = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const mergedOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers
      }
    };
    
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      mergedOptions.headers = {
        ...mergedOptions.headers,
        Authorization: `Bearer ${token}`
      };
    }
    
    const response = await fetch(url, mergedOptions);
    return handleResponse(response);
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// API endpoints
export const api = {
  // Auth endpoints
  auth: {
    login: (username: string, password: string) => 
      fetchApi('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password })
      }),
    
    logout: () => 
      fetchApi('/auth/logout', {
        method: 'POST'
      }),
    
    getProfile: () => 
      fetchApi('/auth/profile')
  },
  
  // Content endpoints
  content: {
    getHomeContent: () => 
      fetchApi('/content/home'),
    
    getContentDetails: (contentId: string) => 
      fetchApi(`/content/${contentId}`),
    
    getRecommendations: (contentId: string) => 
      fetchApi(`/content/${contentId}/recommendations`),
    
    search: (query: string) => 
      fetchApi(`/content/search?q=${encodeURIComponent(query)}`)
  },
  
  // User preferences endpoints
  preferences: {
    get: () => 
      fetchApi('/user/preferences'),
    
    update: (preferences: Record<string, any>) => 
      fetchApi('/user/preferences', {
        method: 'PUT',
        body: JSON.stringify(preferences)
      })
  }
};

export default api;
