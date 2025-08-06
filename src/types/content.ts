export interface Content {
  id: string;
  title: string;
  description: string;
  poster: string;
  backdrop: string;
  year: number;
  rating: number;
  duration: string;
  genre: string[];
  type: 'movie' | 'series' | 'cartoon' | 'documentary';
  featured: boolean;
  trending: boolean;
  userRating?: number;
  reviews?: Review[];
  seasons?: number;
  episodes?: number;
}

export interface Review {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  watchlist: string[];
  preferences: string[];
}