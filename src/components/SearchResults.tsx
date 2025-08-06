import React from 'react';
import { Content } from '../types/content';
import ContentCard from './ContentCard';

interface SearchResultsProps {
  query: string;
  results: Content[];
  onContentClick: (content: Content) => void;
  onAddToWatchlist: (contentId: string) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ 
  query, 
  results, 
  onContentClick, 
  onAddToWatchlist 
}) => {
  if (!query) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-6">
        Search Results for "{query}" ({results.length} found)
      </h2>
      
      {results.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-300">No results found</h3>
            <p className="text-gray-400">Try adjusting your search terms</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {results.map((item) => (
            <ContentCard
              key={item.id}
              content={item}
              onClick={() => onContentClick(item)}
              onAddToWatchlist={() => onAddToWatchlist(item.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default SearchResults;