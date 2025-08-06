# Stream-Yeebs - Comprehensive Streaming Platform

A modern, Netflix-inspired streaming platform built with React, TypeScript, and Tailwind CSS, powered by The Movie Database (TMDB) API for real movie and TV show data.

## Features

### 🎬 Content Discovery
- **Real Movie & TV Data**: Powered by TMDB API with thousands of movies, TV shows, documentaries, and animated content
- **Advanced Search**: Search across all content types with real-time results
- **Smart Categories**: Trending, Popular Movies, TV Series, Cartoons, and Documentaries
- **Featured Content**: Dynamic hero section showcasing top-rated content

### 🎨 Premium Design
- **Netflix-Inspired UI**: Dark theme optimized for streaming with premium aesthetics
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Accessible**: High contrast ratios and keyboard navigation support

### 👤 User Experience
- **Personal Watchlist**: Save content for later viewing with local storage persistence
- **Content Details**: Rich modals with ratings, genres, cast, and user reviews
- **Intuitive Navigation**: Easy browsing with category filters and search
- **Loading States**: Elegant loading animations and skeleton screens

### 🔧 Technical Features
- **TypeScript**: Full type safety and better development experience
- **Modern React**: Hooks, context, and functional components
- **Tailwind CSS**: Utility-first styling with custom design system
- **API Integration**: Real-time data from TMDB with error handling
- **Performance Optimized**: Lazy loading, image optimization, and efficient rendering

## Getting Started

### Prerequisites
- Node.js 16+ and npm
- Free TMDB API key (get one at [themoviedb.org](https://www.themoviedb.org/settings/api))

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd stream-yeebs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Get your TMDB API key**
   - Visit [TMDB API Settings](https://www.themoviedb.org/settings/api)
   - Create a free account if you don't have one
   - Request an API key (instant approval)
   - Enter your API key when prompted in the app

## API Integration

Stream-Yeebs uses The Movie Database (TMDB) API to provide:

- **Trending Content**: Daily and weekly trending movies and TV shows
- **Popular Content**: Most popular movies and TV series
- **Search Functionality**: Multi-search across movies, TV shows, and people
- **Detailed Information**: Cast, crew, ratings, reviews, and metadata
- **High-Quality Images**: Posters, backdrops, and profile pictures
- **Genre Classification**: Automatic categorization of content

### API Features Used
- `/trending/{media_type}/{time_window}` - Trending content
- `/movie/popular` - Popular movies
- `/tv/popular` - Popular TV shows
- `/search/multi` - Universal search
- `/discover/movie` - Filtered movie discovery
- `/discover/tv` - Filtered TV show discovery
- `/genre/movie/list` - Movie genres
- `/genre/tv/list` - TV genres

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation and search
│   ├── Hero.tsx        # Featured content section
│   ├── ContentGrid.tsx # Content display grid
│   ├── ContentCard.tsx # Individual content cards
│   ├── ContentModal.tsx# Content detail modal
│   └── ...
├── services/           # API services
│   ├── tmdbApi.ts     # TMDB API client
│   └── contentService.ts # Content transformation
├── hooks/              # Custom React hooks
│   ├── useContent.ts  # Content data management
│   └── useWatchlist.ts # Watchlist functionality
├── types/              # TypeScript definitions
└── data/               # Static data and constants
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Variables

The app uses TMDB API key stored in localStorage for security and ease of use. No server-side environment variables are required.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the comprehensive movie and TV database
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide React](https://lucide.dev/) for the beautiful icon set
- [Vite](https://vitejs.dev/) for the fast build tool and development server

## API Rate Limits

TMDB API provides generous rate limits for free accounts:
- 1,000 requests per day
- 50 requests per minute

For production use with higher traffic, consider upgrading to a paid TMDB plan.