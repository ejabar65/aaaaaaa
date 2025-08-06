import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ContentGrid from './components/ContentGrid';
import ContentModal from './components/ContentModal';
import SearchResults from './components/SearchResults';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import ContentSkeleton from './components/ContentSkeleton';
import ApiKeySetup from './components/ApiKeySetup';
import { Content } from './types/content';
import { useWatchlist } from './hooks/useWatchlist';
import { useContent } from './hooks/useContent';

function App() {
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem('tmdb_api_key') || '';
  });
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToWatchlist } = useWatchlist();
  const { 
    content, 
    featuredContent, 
    loading, 
    error, 
    searchResults, 
    searchLoading, 
    searchContent 
  } = useContent();

  // Handle API key setup
  const handleApiKeySet = (key: string) => {
    localStorage.setItem('tmdb_api_key', key);
    setApiKey(key);
    // Update the API key in the service
    window.location.reload(); // Simple way to reinitialize with new API key
  };

  // Show API key setup if not configured
  if (!apiKey) {
    return <ApiKeySetup onApiKeySet={handleApiKeySet} />;
  }

  // Categories for navigation
  const categories = [
    { id: 'trending', name: 'Trending Now', content: content.trending },
    { id: 'movies', name: 'Movies', content: content.movies },
    { id: 'series', name: 'TV Series', content: content.series },
    { id: 'cartoons', name: 'Cartoons', content: content.cartoons },
    { id: 'documentaries', name: 'Documentaries', content: content.documentaries },
  ];

  // Filter content based on category
  const filteredContent = useMemo(() => {
    if (currentCategory !== 'all') {
      const category = categories.find(cat => cat.id === currentCategory);
      return category?.content || [];
    }
    return [];
  }, [currentCategory, content]);

  // Group content by categories for display
  const contentByCategory = useMemo(() => {
    return categories.filter(category => category.content.length > 0);
  }, [content]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setCurrentCategory('all');
    if (query.trim()) {
      await searchContent(query);
    }
  };

  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category);
    setSearchQuery(''); // Clear search when changing category
  };

  const handleContentClick = (content: Content) => {
    setSelectedContent(content);
  };

  const handleCloseModal = () => {
    setSelectedContent(null);
  };

  const handleAddToWatchlist = (contentId: string) => {
    addToWatchlist(contentId);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Header
          onSearch={handleSearch}
          onCategoryChange={handleCategoryChange}
          currentCategory={currentCategory}
        />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <LoadingSpinner size="lg" className="mx-auto mb-4" />
                <p className="text-gray-400">Loading amazing content...</p>
              </div>
            </div>
            <div className="space-y-8">
              <ContentSkeleton count={6} />
              <ContentSkeleton count={6} />
              <ContentSkeleton count={6} />
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-black">
        <Header
          onSearch={handleSearch}
          onCategoryChange={handleCategoryChange}
          currentCategory={currentCategory}
        />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ErrorMessage 
              message={error} 
              onRetry={() => window.location.reload()} 
            />
          </div>
        </main>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black">
      <Header
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
        currentCategory={currentCategory}
      />

      <main className="pt-16">
        {/* Hero Section - Only show when not searching */}
        {!searchQuery.trim() && (
          <>
            {featuredContent ? (
              <Hero
                featuredContent={featuredContent}
                onAddToWatchlist={handleAddToWatchlist}
                onShowDetails={handleContentClick}
              />
            ) : (
              <div className="h-[70vh] min-h-[500px] bg-gray-900 flex items-center justify-center">
                <LoadingSpinner size="lg" />
              </div>
            )}
          </>
        )}

        {/* Content Sections */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search Results */}
          {searchQuery.trim() && (
            <>
              {searchLoading ? (
                <div className="text-center py-12">
                  <LoadingSpinner size="lg" className="mx-auto mb-4" />
                  <p className="text-gray-400">Searching...</p>
                </div>
              ) : (
                <SearchResults
                  query={searchQuery}
                  results={searchResults}
                  onContentClick={handleContentClick}
                  onAddToWatchlist={handleAddToWatchlist}
                />
              )}
            </>
          )}

          {/* Category Content Grids */}
          {!searchQuery.trim() && currentCategory === 'all' && (
            <>
              {contentByCategory.map(category => (
                <ContentGrid
                  key={category.id}
                  title={category.name}
                  content={category.content}
                  onContentClick={handleContentClick}
                  onAddToWatchlist={handleAddToWatchlist}
                />
              ))}
            </>
          )}

          {/* Single Category View */}
          {!searchQuery.trim() && currentCategory !== 'all' && (
            <>
              {filteredContent.length > 0 ? (
                <ContentGrid
                  title={categories.find(cat => cat.id === currentCategory)?.name || 'Content'}
                  content={filteredContent}
                  onContentClick={handleContentClick}
                  onAddToWatchlist={handleAddToWatchlist}
                />
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-400">No content available in this category.</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Content Detail Modal */}
      <ContentModal
        content={selectedContent}
        isOpen={!!selectedContent}
        onClose={handleCloseModal}
        onAddToWatchlist={handleAddToWatchlist}
      />
    </div>
  );
}

export default App;