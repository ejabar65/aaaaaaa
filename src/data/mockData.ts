import { Content } from '../types/content';

export const mockContent: Content[] = [
  {
    id: '1',
    title: 'Stellar Odyssey',
    description: 'A breathtaking journey through space that follows a crew of explorers as they discover new worlds and face cosmic challenges that will determine the fate of humanity.',
    poster: 'https://images.pexels.com/photos/998641/pexels-photo-998641.jpeg',
    backdrop: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg',
    year: 2024,
    rating: 8.7,
    duration: '2h 28m',
    genre: ['Sci-Fi', 'Adventure', 'Drama'],
    type: 'movie',
    featured: true,
    trending: true,
    reviews: [
      {
        id: '1',
        userId: '1',
        username: 'SpaceExplorer',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
        rating: 9,
        comment: 'Absolutely stunning visuals and compelling storytelling. A must-watch!',
        date: '2024-01-15',
        helpful: 24
      }
    ]
  },
  {
    id: '2',
    title: 'Ocean Mysteries',
    description: 'Dive deep into the unexplored depths of our oceans in this fascinating documentary series that reveals the secrets of marine life.',
    poster: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg',
    backdrop: 'https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg',
    year: 2023,
    rating: 9.2,
    duration: '45m',
    genre: ['Documentary', 'Nature'],
    type: 'documentary',
    featured: false,
    trending: true,
    seasons: 2,
    episodes: 16
  },
  {
    id: '3',
    title: 'Galaxy Adventures',
    description: 'Join our young heroes as they travel through colorful galaxies, meeting alien friends and learning valuable lessons about friendship.',
    poster: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg',
    backdrop: 'https://images.pexels.com/photos/1205301/pexels-photo-1205301.jpeg',
    year: 2024,
    rating: 8.1,
    duration: '22m',
    genre: ['Animation', 'Family', 'Adventure'],
    type: 'cartoon',
    featured: false,
    trending: false,
    seasons: 3,
    episodes: 42
  },
  {
    id: '4',
    title: 'Urban Chronicles',
    description: 'A gripping drama series following the interconnected lives of residents in a bustling metropolitan city.',
    poster: 'https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg',
    backdrop: 'https://images.pexels.com/photos/1705642/pexels-photo-1705642.jpeg',
    year: 2023,
    rating: 8.9,
    duration: '55m',
    genre: ['Drama', 'Crime', 'Thriller'],
    type: 'series',
    featured: false,
    trending: true,
    seasons: 4,
    episodes: 48
  },
  {
    id: '5',
    title: 'Mountain Quest',
    description: 'An epic adventure film about a group of climbers attempting to conquer the world\'s most dangerous peak.',
    poster: 'https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg',
    backdrop: 'https://images.pexels.com/photos/1030653/pexels-photo-1030653.jpeg',
    year: 2024,
    rating: 7.8,
    duration: '1h 54m',
    genre: ['Adventure', 'Drama', 'Thriller'],
    type: 'movie',
    featured: false,
    trending: false
  },
  {
    id: '6',
    title: 'Magical Forest Tales',
    description: 'Enchanting animated stories from a mystical forest where talking animals learn about kindness and courage.',
    poster: 'https://images.pexels.com/photos/1146134/pexels-photo-1146134.jpeg',
    backdrop: 'https://images.pexels.com/photos/1212487/pexels-photo-1212487.jpeg',
    year: 2024,
    rating: 8.5,
    duration: '25m',
    genre: ['Animation', 'Family', 'Fantasy'],
    type: 'cartoon',
    featured: false,
    trending: false,
    seasons: 2,
    episodes: 24
  }
];

export const categories = [
  { id: 'trending', name: 'Trending Now', filter: (content: Content) => content.trending },
  { id: 'movies', name: 'Movies', filter: (content: Content) => content.type === 'movie' },
  { id: 'series', name: 'TV Series', filter: (content: Content) => content.type === 'series' },
  { id: 'cartoons', name: 'Cartoons', filter: (content: Content) => content.type === 'cartoon' },
  { id: 'documentaries', name: 'Documentaries', filter: (content: Content) => content.type === 'documentary' },
];