import React from 'react';
import { Content } from '../types/content';
import ContentCard from './ContentCard';

interface ContentGridProps {
  title: string;
  content: Content[];
  onContentClick: (content: Content) => void;
  onAddToWatchlist: (contentId: string) => void;
}

const ContentGrid: React.FC<ContentGridProps> = ({ 
  title, 
  content, 
  onContentClick, 
  onAddToWatchlist 
}) => {
  if (content.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {content.map((item) => (
          <ContentCard
            key={item.id}
            content={item}
            onClick={() => onContentClick(item)}
            onAddToWatchlist={() => onAddToWatchlist(item.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default ContentGrid;