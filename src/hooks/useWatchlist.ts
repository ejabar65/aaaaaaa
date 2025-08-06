import { useState, useEffect } from 'react';

export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState<string[]>([]);

  // Load watchlist from localStorage on mount
  useEffect(() => {
    const savedWatchlist = localStorage.getItem('stream-yeebs-watchlist');
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    }
  }, []);

  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('stream-yeebs-watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (contentId: string) => {
    setWatchlist(prev => {
      if (prev.includes(contentId)) {
        return prev; // Already in watchlist
      }
      return [...prev, contentId];
    });
  };

  const removeFromWatchlist = (contentId: string) => {
    setWatchlist(prev => prev.filter(id => id !== contentId));
  };

  const isInWatchlist = (contentId: string) => {
    return watchlist.includes(contentId);
  };

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist
  };
};