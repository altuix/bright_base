# Smart TV Application Boilerplate

A lightweight, performant Smart TV application boilerplate built with React, TypeScript, and Norigin Spatial Navigation. Optimized for Tizen, webOS, and Hisense platforms.

## Features

- **Remote Control Navigation**: Seamless navigation using Norigin Spatial Navigation
- **Lightweight Custom Routing**: Simple history stack-based navigation without heavy router libraries
- **State Management**: Zustand for global state management (auth, navigation, content)
- **SCSS Styling**: REM-based scaling responsive to 1920x1080 resolution
- **Platform Detection**: Support for Tizen, webOS, and Hisense with platform-specific key handling
- **Performance Optimized**: Virtualization for content grids and lazy loading
- **Older Browser Support**: Compatible with embedded browsers (Chrome 50+)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ContentGrid/     # Content grid components (rows, cards)
│   ├── Detail/          # Detail page components
│   ├── MainMenu/        # Main menu components
│   └── Player/          # Video player components
├── layouts/             # Page layouts
│   ├── MainLayout.tsx   # Home page layout
│   ├── DetailLayout.tsx # Content detail layout
│   └── PlayerLayout.tsx # Video player layout
├── platform/            # Platform-specific code
│   ├── detect.ts        # Platform detection
│   ├── keys.ts          # Key code mappings
│   └── capabilities.ts  # Platform capabilities
├── services/            # API and external services
│   └── api.ts           # API service
├── state/               # Global state management
│   ├── authStore.ts     # Authentication state
│   ├── navigationStore.ts # Navigation state
│   └── contentStore.ts  # Content state
├── styles/              # SCSS styles
│   ├── _variables.scss  # Color and size variables
│   ├── _mixins.scss     # SCSS mixins
│   ├── main.scss        # Main styles
│   ├── app.scss         # App-specific styles
│   └── layouts/         # Layout styles
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
│   ├── navigation.ts    # Navigation utilities
│   ├── tvUtils.ts       # TV-specific utilities
│   └── virtualization.ts # Virtualization helpers
├── App.tsx              # Main App component
└── index.tsx            # Application entry point
```

## Navigation System

The application uses a custom lightweight history stack to simulate page navigation:

- **Current Page**: Tracks the active page/layout
- **History Stack**: Maintains navigation history for back button support
- **Last Focused Keys**: Remembers focus position when returning to a page
- **Navigation Actions**: Navigate to page, back, replace current page

## Styling

- SCSS with REM scaling for responsive design
- Common focus styles for scaling and outline on focused elements
- Component-specific styles imported into main.scss

## Platform Support

- **Tizen**: Samsung Smart TVs
- **webOS**: LG Smart TVs
- **Hisense**: Hisense Smart TVs
- **Generic**: Fallback for other platforms

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Start development server:
   ```
   npm start
   ```

3. Build for production:
   ```
   npm run build
   ```

## Key Components

- **MainMenu**: Navigation menu with focusable items
- **ContentGrid**: Featured content and content rows
- **DetailLayout**: Content details with actions
- **PlayerLayout**: Video player with controls

## Best Practices

- Keep focus management simple and trust the spatial algorithm
- Follow container/leaf pattern for components
- Use consistent focus key naming conventions
- Optimize for performance with virtualization and lazy loading
