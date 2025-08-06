import { useState, useEffect } from 'react';
import { Content } from '../types/content';
import { contentService } from '../services/contentService';

interface UseContentReturn {
  content: {
    trending: Content[];
    movies: Content[];
    series: Content[];
    cartoons: Content[];
    documentaries: Content[];
  };
  featuredContent: Content | null;
  loading: boolean;
  error: string | null;
  searchResults: Content[];
  searchLoading: boolean;
  searchContent: (query: string) => Promise<void>;
}

export const useContent = (): UseContentReturn => {
  const [content, setContent] = useState({
    trending: [],
    movies: [],
    series: [],
    cartoons: [],
    documentaries: [],
  });
  const [featuredContent, setFeaturedContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<Content[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setLoading(true);
      setError(null);

      const [
        trending,
        movies,
        series,
        cartoons,
        documentaries,
        featured
      ] = await Promise.all([
        contentService.getTrendingContent(),
        contentService.getPopularMovies(),
        contentService.getPopularTVShows(),
        contentService.getAnimatedContent(),
        contentService.getDocumentaries(),
        contentService.getFeaturedContent()
      ]);

      setContent({
        trending: trending.slice(0, 20),
        movies: movies.slice(0, 20),
        series: series.slice(0, 20),
        cartoons: cartoons.slice(0, 20),
        documentaries: documentaries.slice(0, 20),
      });

      setFeaturedContent(featured);
    } catch (err) {
      setError('Failed to load content. Please check your internet connection and try again.');
      console.error('Content loading error:', err);
    } finally {
      setLoading(false);
    }
  };

  const searchContent = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setSearchLoading(true);
      const results = await contentService.searchContent(query);
      setSearchResults(results);
    } catch (err) {
      console.error('Search error:', err);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  return {
    content,
    featuredContent,
    loading,
    error,
    searchResults,
    searchLoading,
    searchContent,
  };
};