import React from 'react';
import { X, Play, Plus, Star, Clock, Calendar, Users } from 'lucide-react';
import { Content } from '../types/content';

interface ContentModalProps {
  content: Content | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToWatchlist: (contentId: string) => void;
}

const ContentModal: React.FC<ContentModalProps> = ({ 
  content, 
  isOpen, 
  onClose, 
  onAddToWatchlist 
}) => {
  if (!isOpen || !content) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-gray-900 rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Header with Backdrop */}
        <div className="relative h-64 sm:h-80 bg-gray-800 rounded-t-lg overflow-hidden">
          <img
            src={content.backdrop}
            alt={content.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
          
          {/* Content Info Overlay */}
          <div className="absolute bottom-6 left-6 right-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              {content.title}
            </h2>
            
            <div className="flex items-center space-x-4 text-gray-300">
              <div className="flex items-center space-x-1">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="font-semibold">{content.rating}</span>
              </div>
              <span>{content.year}</span>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{content.duration}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button className="flex items-center space-x-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
              <Play className="h-5 w-5 fill-current" />
              <span>Play Now</span>
            </button>
            
            <button
              onClick={() => onAddToWatchlist(content.id)}
              className="flex items-center space-x-2 bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>Add to List</span>
            </button>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white mb-3">Synopsis</h3>
            <p className="text-gray-300 leading-relaxed">{content.description}</p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Left Column */}
            <div>
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-400 mb-2">GENRES</h4>
                <div className="flex flex-wrap gap-2">
                  {content.genre.map((genre) => (
                    <span
                      key={genre}
                      className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-400 mb-2">TYPE</h4>
                <p className="text-white capitalize">{content.type}</p>
              </div>
            </div>

            {/* Right Column */}
            <div>
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-400 mb-2">RELEASE YEAR</h4>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-white">{content.year}</span>
                </div>
              </div>
              
              {(content.seasons || content.episodes) && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">EPISODES</h4>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-white">
                      {content.seasons && `${content.seasons} Season${content.seasons > 1 ? 's' : ''}`}
                      {content.seasons && content.episodes && ' • '}
                      {content.episodes && `${content.episodes} Episodes`}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Reviews Section */}
          {content.reviews && content.reviews.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">User Reviews</h3>
              <div className="space-y-4">
                {content.reviews.map((review) => (
                  <div key={review.id} className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <img
                        src={review.avatar}
                        alt={review.username}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-white">{review.username}</span>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-gray-300">{review.rating}/10</span>
                            </div>
                          </div>
                          <span className="text-sm text-gray-400">{review.date}</span>
                        </div>
                        <p className="text-gray-300 mb-2">{review.comment}</p>
                        <button className="text-sm text-gray-400 hover:text-white">
                          👍 {review.helpful} helpful
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentModal;