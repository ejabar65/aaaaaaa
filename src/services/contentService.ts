import { tmdbService, TMDBMovie, TMDBTVShow } from './tmdbApi';
import { Content } from '../types/content';

class ContentService {
  private genreCache: Map<number, string> = new Map();
  private initialized = false;

  async initialize() {
    if (this.initialized) return;
    
    try {
      // Load genres for movies and TV shows
      const [movieGenres, tvGenres] = await Promise.all([
        tmdbService.getMovieGenres(),
        tmdbService.getTVGenres()
      ]);

      // Cache all genres
      [...movieGenres.genres, ...tvGenres.genres].forEach(genre => {
        this.genreCache.set(genre.id, genre.name);
      });

      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize content service:', error);
    }
  }

  private convertTMDBToContent(item: TMDBMovie | TMDBTVShow, type?: 'movie' | 'tv'): Content {
    const isMovie = 'title' in item || type === 'movie';
    const isTVShow = 'name' in item || type === 'tv';
    
    // Determine content type
    let contentType: Content['type'] = 'movie';
    if (isTVShow) {
      contentType = 'series';
    }

    // Get genres
    const genreIds = item.genre_ids || [];
    const genres = item.genres || [];
    const genreNames = genres.length > 0 
      ? genres.map(g => g.name)
      : genreIds.map(id => this.genreCache.get(id) || 'Unknown').filter(name => name !== 'Unknown');

    // Determine if it's animated/cartoon
    if (genreNames.includes('Animation')) {
      contentType = 'cartoon';
    }

    // Determine if it's documentary
    if (genreNames.includes('Documentary')) {
      contentType = 'documentary';
    }

    const baseContent = {
      id: item.id.toString(),
      poster: tmdbService.getImageUrl(item.poster_path),
      backdrop: tmdbService.getBackdropUrl(item.backdrop_path),
      rating: Math.round(item.vote_average * 10) / 10,
      genre: genreNames.slice(0, 3), // Limit to 3 genres
      type: contentType,
      featured: item.vote_average >= 8.0,
      trending: item.vote_average >= 7.5,
    };

    if (isMovie) {
      const movie = item as TMDBMovie;
      return {
        ...baseContent,
        title: movie.title,
        description: movie.overview || 'No description available.',
        year: new Date(movie.release_date || '').getFullYear() || new Date().getFullYear(),
        duration: movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : '2h 0m',
      };
    } else {
      const tvShow = item as TMDBTVShow;
      const avgRuntime = tvShow.episode_run_time?.[0] || 45;
      return {
        ...baseContent,
        title: tvShow.name,
        description: tvShow.overview || 'No description available.',
        year: new Date(tvShow.first_air_date || '').getFullYear() || new Date().getFullYear(),
        duration: `${avgRuntime}m`,
        seasons: tvShow.number_of_seasons,
        episodes: tvShow.number_of_episodes,
      };
    }
  }

  async getTrendingContent(): Promise<Content[]> {
    await this.initialize();
    try {
      const response = await tmdbService.getTrending('all', 'week');
      return response.results.map(item => this.convertTMDBToContent(item));
    } catch (error) {
      console.error('Failed to fetch trending content:', error);
      return [];
    }
  }

  async getPopularMovies(): Promise<Content[]> {
    await this.initialize();
    try {
      const response = await tmdbService.getPopularMovies();
      return response.results.map(item => this.convertTMDBToContent(item, 'movie'));
    } catch (error) {
      console.error('Failed to fetch popular movies:', error);
      return [];
    }
  }

  async getPopularTVShows(): Promise<Content[]> {
    await this.initialize();
    try {
      const response = await tmdbService.getPopularTVShows();
      return response.results.map(item => this.convertTMDBToContent(item, 'tv'));
    } catch (error) {
      console.error('Failed to fetch popular TV shows:', error);
      return [];
    }
  }

  async getTopRatedMovies(): Promise<Content[]> {
    await this.initialize();
    try {
      const response = await tmdbService.getTopRatedMovies();
      return response.results.map(item => this.convertTMDBToContent(item, 'movie'));
    } catch (error) {
      console.error('Failed to fetch top rated movies:', error);
      return [];
    }
  }

  async getTopRatedTVShows(): Promise<Content[]> {
    await this.initialize();
    try {
      const response = await tmdbService.getTopRatedTVShows();
      return response.results.map(item => this.convertTMDBToContent(item, 'tv'));
    } catch (error) {
      console.error('Failed to fetch top rated TV shows:', error);
      return [];
    }
  }

  async getDocumentaries(): Promise<Content[]> {
    await this.initialize();
    try {
      const response = await tmdbService.discoverMovies({
        genre: '99', // Documentary genre ID
        sortBy: 'popularity.desc'
      });
      return response.results.map(item => this.convertTMDBToContent(item, 'movie'));
    } catch (error) {
      console.error('Failed to fetch documentaries:', error);
      return [];
    }
  }

  async getAnimatedContent(): Promise<Content[]> {
    await this.initialize();
    try {
      const [animatedMovies, animatedTVShows] = await Promise.all([
        tmdbService.discoverMovies({
          genre: '16', // Animation genre ID
          sortBy: 'popularity.desc'
        }),
        tmdbService.discoverTVShows({
          genre: '16', // Animation genre ID
          sortBy: 'popularity.desc'
        })
      ]);

      const movies = animatedMovies.results.map(item => this.convertTMDBToContent(item, 'movie'));
      const tvShows = animatedTVShows.results.map(item => this.convertTMDBToContent(item, 'tv'));
      
      return [...movies, ...tvShows].sort((a, b) => b.rating - a.rating);
    } catch (error) {
      console.error('Failed to fetch animated content:', error);
      return [];
    }
  }

  async searchContent(query: string): Promise<Content[]> {
    await this.initialize();
    try {
      const response = await tmdbService.searchMulti(query);
      return response.results
        .filter(item => item.media_type !== 'person') // Filter out people
        .map(item => this.convertTMDBToContent(item));
    } catch (error) {
      console.error('Failed to search content:', error);
      return [];
    }
  }

  async getContentDetails(id: string, type: 'movie' | 'tv'): Promise<Content | null> {
    await this.initialize();
    try {
      if (type === 'movie') {
        const movie = await tmdbService.getMovieDetails(parseInt(id));
        return this.convertTMDBToContent(movie, 'movie');
      } else {
        const tvShow = await tmdbService.getTVShowDetails(parseInt(id));
        return this.convertTMDBToContent(tvShow, 'tv');
      }
    } catch (error) {
      console.error('Failed to fetch content details:', error);
      return null;
    }
  }

  async getFeaturedContent(): Promise<Content | null> {
    await this.initialize();
    try {
      const trending = await this.getTrendingContent();
      const featured = trending.find(content => content.featured && content.rating >= 8.0);
      return featured || trending[0] || null;
    } catch (error) {
      console.error('Failed to fetch featured content:', error);
      return null;
    }
  }
}

export const contentService = new ContentService();