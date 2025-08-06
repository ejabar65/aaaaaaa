import React, { useState } from 'react';
import { Key, ExternalLink, CheckCircle } from 'lucide-react';

interface ApiKeySetupProps {
  onApiKeySet: (apiKey: string) => void;
}

const ApiKeySetup: React.FC<ApiKeySetupProps> = ({ onApiKeySet }) => {
  const [apiKey, setApiKey] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) return;

    setIsValidating(true);
    
    // Simple validation - in a real app, you'd test the API key
    setTimeout(() => {
      onApiKeySet(apiKey.trim());
      setIsValidating(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-900 rounded-lg p-8">
        <div className="text-center mb-8">
          <Key className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Setup Stream-Yeebs</h1>
          <p className="text-gray-400">
            To access real movie and TV show data, you'll need a free TMDB API key.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">How to get your API key:</h3>
          <ol className="text-sm text-gray-300 space-y-2">
            <li className="flex items-start">
              <span className="bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
              <span>Visit TMDB and create a free account</span>
            </li>
            <li className="flex items-start">
              <span className="bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
              <span>Go to your account settings → API</span>
            </li>
            <li className="flex items-start">
              <span className="bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
              <span>Request an API key (it's instant and free)</span>
            </li>
            <li className="flex items-start">
              <span className="bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">4</span>
              <span>Copy your API key and paste it below</span>
            </li>
          </ol>
        </div>

        <a
          href="https://www.themoviedb.org/settings/api"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mb-6"
        >
          <ExternalLink className="h-4 w-4" />
          <span>Get TMDB API Key</span>
        </a>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-300 mb-2">
              TMDB API Key
            </label>
            <input
              type="text"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your TMDB API key..."
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={!apiKey.trim() || isValidating}
            className="w-full flex items-center justify-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isValidating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                <span>Validating...</span>
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4" />
                <span>Start Streaming</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 p-4 bg-gray-800 rounded-lg">
          <p className="text-xs text-gray-400">
            <strong>Note:</strong> Your API key is stored locally in your browser and never sent to our servers. 
            TMDB API is free for non-commercial use with generous rate limits.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApiKeySetup;