import React from 'react';
import { Play, Plus, Info, Star } from 'lucide-react';
import { Content } from '../types/content';

interface HeroProps {
  featuredContent: Content;
  onAddToWatchlist: (contentId: string) => void;
  onShowDetails: (content: Content) => void;
}

const Hero: React.FC<HeroProps> = ({ featuredContent, onAddToWatchlist, onShowDetails }) => {
  return (
    <div className="relative h-[70vh] min-h-[500px] flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${featuredContent.backdrop})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="max-w-2xl">
          {/* Featured Badge */}
          <div className="flex items-center space-x-2 mb-4">
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              FEATURED
            </span>
            {featuredContent.trending && (
              <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
                TRENDING
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            {featuredContent.title}
          </h1>

          {/* Rating & Info */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center space-x-1">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="text-white font-semibold">{featuredContent.rating}</span>
            </div>
            <span className="text-gray-300">{featuredContent.year}</span>
            <span className="text-gray-300">{featuredContent.duration}</span>
            <span className="text-gray-300 capitalize">{featuredContent.type}</span>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 mb-6">
            {featuredContent.genre.map((genre) => (
              <span
                key={genre}
                className="px-3 py-1 bg-gray-800/80 text-gray-300 rounded-full text-sm"
              >
                {genre}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            {featuredContent.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex items-center justify-center space-x-2 bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
              <Play className="h-5 w-5 fill-current" />
              <span>Play Now</span>
            </button>
            
            <button
              onClick={() => onAddToWatchlist(featuredContent.id)}
              className="flex items-center justify-center space-x-2 bg-gray-800/80 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>My List</span>
            </button>
            
            <button
              onClick={() => onShowDetails(featuredContent)}
              className="flex items-center justify-center space-x-2 bg-transparent border border-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:border-gray-400 transition-colors"
            >
              <Info className="h-5 w-5" />
              <span>More Info</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;