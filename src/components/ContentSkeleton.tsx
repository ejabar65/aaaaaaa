import React from 'react';

interface ContentSkeletonProps {
  count?: number;
}

const ContentSkeleton: React.FC<ContentSkeletonProps> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="aspect-[2/3] bg-gray-800 rounded-lg mb-2" />
          <div className="h-4 bg-gray-800 rounded mb-1" />
          <div className="h-3 bg-gray-800 rounded w-2/3" />
        </div>
      ))}
    </div>
  );
};

export default ContentSkeleton;