import React, { useState } from 'react';
import { Play, Plus, Star, Clock } from 'lucide-react';
import { Content } from '../types/content';

interface ContentCardProps {
  content: Content;
  onClick: () => void;
  onAddToWatchlist: () => void;
}

const ContentCard: React.FC<ContentCardProps> = ({ content, onClick, onAddToWatchlist }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group cursor-pointer transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Poster Image */}
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-800">
        <img
          src={content.poster}
          alt={content.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Trending Badge */}
        {content.trending && (
          <div className="absolute top-2 left-2">
            <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
              TRENDING
            </span>
          </div>
        )}

        {/* Rating Badge */}
        <div className="absolute top-2 right-2">
          <div className="flex items-center space-x-1 bg-black/70 px-2 py-1 rounded text-xs">
            <Star className="h-3 w-3 text-yellow-400 fill-current" />
            <span className="text-white font-medium">{content.rating}</span>
          </div>
        </div>

        {/* Hover Actions */}
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="flex space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // Play action would go here
                }}
                className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-colors"
              >
                <Play className="h-4 w-4 fill-current" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToWatchlist();
                }}
                className="bg-gray-800/80 text-white p-2 rounded-full hover:bg-gray-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Content Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
            {content.title}
          </h3>
          
          <div className="flex items-center space-x-2 text-xs text-gray-300">
            <span>{content.year}</span>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{content.duration}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-2">
            {content.genre.slice(0, 2).map((genre) => (
              <span
                key={genre}
                className="px-2 py-0.5 bg-gray-700/80 text-white rounded text-xs"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;