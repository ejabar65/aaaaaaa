const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// You'll need to get your own API key from https://www.themoviedb.org/settings/api
const TMDB_API_KEY = 'your_tmdb_api_key_here'; // Replace with actual API key

export interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  runtime?: number;
  genre_ids: number[];
  genres?: { id: number; name: string }[];
  adult: boolean;
}

export interface TMDBTVShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
  vote_average: number;
  genre_ids: number[];
  genres?: { id: number; name: string }[];
  number_of_seasons?: number;
  number_of_episodes?: number;
  episode_run_time?: number[];
}

export interface TMDBGenre {
  id: number;
  name: string;
}

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

class TMDBService {
  private apiKey: string;

  constructor() {
    this.apiKey = TMDB_API_KEY;
  }

  private async fetchFromTMDB<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
    const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
    url.searchParams.append('api_key', this.apiKey);
    
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    try {
      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error(`TMDB API error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('TMDB API fetch error:', error);
      throw error;
    }
  }

  // Get trending content
  async getTrending(mediaType: 'all' | 'movie' | 'tv' = 'all', timeWindow: 'day' | 'week' = 'week'): Promise<TMDBResponse<TMDBMovie | TMDBTVShow>> {
    return this.fetchFromTMDB(`/trending/${mediaType}/${timeWindow}`);
  }

  // Get popular movies
  async getPopularMovies(page: number = 1): Promise<TMDBResponse<TMDBMovie>> {
    return this.fetchFromTMDB('/movie/popular', { page: page.toString() });
  }

  // Get popular TV shows
  async getPopularTVShows(page: number = 1): Promise<TMDBResponse<TMDBTVShow>> {
    return this.fetchFromTMDB('/tv/popular', { page: page.toString() });
  }

  // Get top rated movies
  async getTopRatedMovies(page: number = 1): Promise<TMDBResponse<TMDBMovie>> {
    return this.fetchFromTMDB('/movie/top_rated', { page: page.toString() });
  }

  // Get top rated TV shows
  async getTopRatedTVShows(page: number = 1): Promise<TMDBResponse<TMDBTVShow>> {
    return this.fetchFromTMDB('/tv/top_rated', { page: page.toString() });
  }

  // Get now playing movies
  async getNowPlayingMovies(page: number = 1): Promise<TMDBResponse<TMDBMovie>> {
    return this.fetchFromTMDB('/movie/now_playing', { page: page.toString() });
  }

  // Get upcoming movies
  async getUpcomingMovies(page: number = 1): Promise<TMDBResponse<TMDBMovie>> {
    return this.fetchFromTMDB('/movie/upcoming', { page: page.toString() });
  }

  // Get airing today TV shows
  async getAiringTodayTVShows(page: number = 1): Promise<TMDBResponse<TMDBTVShow>> {
    return this.fetchFromTMDB('/tv/airing_today', { page: page.toString() });
  }

  // Get on the air TV shows
  async getOnTheAirTVShows(page: number = 1): Promise<TMDBResponse<TMDBTVShow>> {
    return this.fetchFromTMDB('/tv/on_the_air', { page: page.toString() });
  }

  // Search multi (movies, TV shows, people)
  async searchMulti(query: string, page: number = 1): Promise<TMDBResponse<TMDBMovie | TMDBTVShow>> {
    return this.fetchFromTMDB('/search/multi', { 
      query: encodeURIComponent(query), 
      page: page.toString() 
    });
  }

  // Search movies
  async searchMovies(query: string, page: number = 1): Promise<TMDBResponse<TMDBMovie>> {
    return this.fetchFromTMDB('/search/movie', { 
      query: encodeURIComponent(query), 
      page: page.toString() 
    });
  }

  // Search TV shows
  async searchTVShows(query: string, page: number = 1): Promise<TMDBResponse<TMDBTVShow>> {
    return this.fetchFromTMDB('/search/tv', { 
      query: encodeURIComponent(query), 
      page: page.toString() 
    });
  }

  // Get movie details
  async getMovieDetails(movieId: number): Promise<TMDBMovie> {
    return this.fetchFromTMDB(`/movie/${movieId}`);
  }

  // Get TV show details
  async getTVShowDetails(tvId: number): Promise<TMDBTVShow> {
    return this.fetchFromTMDB(`/tv/${tvId}`);
  }

  // Get movie genres
  async getMovieGenres(): Promise<{ genres: TMDBGenre[] }> {
    return this.fetchFromTMDB('/genre/movie/list');
  }

  // Get TV genres
  async getTVGenres(): Promise<{ genres: TMDBGenre[] }> {
    return this.fetchFromTMDB('/genre/tv/list');
  }

  // Discover movies with filters
  async discoverMovies(params: {
    page?: number;
    genre?: string;
    year?: number;
    sortBy?: string;
    minRating?: number;
  } = {}): Promise<TMDBResponse<TMDBMovie>> {
    const queryParams: Record<string, string> = {};
    
    if (params.page) queryParams.page = params.page.toString();
    if (params.genre) queryParams.with_genres = params.genre;
    if (params.year) queryParams.year = params.year.toString();
    if (params.sortBy) queryParams.sort_by = params.sortBy;
    if (params.minRating) queryParams['vote_average.gte'] = params.minRating.toString();

    return this.fetchFromTMDB('/discover/movie', queryParams);
  }

  // Discover TV shows with filters
  async discoverTVShows(params: {
    page?: number;
    genre?: string;
    year?: number;
    sortBy?: string;
    minRating?: number;
  } = {}): Promise<TMDBResponse<TMDBTVShow>> {
    const queryParams: Record<string, string> = {};
    
    if (params.page) queryParams.page = params.page.toString();
    if (params.genre) queryParams.with_genres = params.genre;
    if (params.year) queryParams.first_air_date_year = params.year.toString();
    if (params.sortBy) queryParams.sort_by = params.sortBy;
    if (params.minRating) queryParams['vote_average.gte'] = params.minRating.toString();

    return this.fetchFromTMDB('/discover/tv', queryParams);
  }

  // Helper methods for image URLs
  getImageUrl(path: string | null, size: 'w200' | 'w300' | 'w400' | 'w500' | 'w780' | 'original' = 'w500'): string {
    if (!path) return '/placeholder-poster.jpg';
    return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
  }

  getBackdropUrl(path: string | null, size: 'w300' | 'w780' | 'w1280' | 'original' = 'w1280'): string {
    if (!path) return '/placeholder-backdrop.jpg';
    return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
  }
}

export const tmdbService = new TMDBService();