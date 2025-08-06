import axios from 'axios';

const API_KEY = localStorage.getItem('tmdbApiKey') || '';
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const fetchTrending = async (mediaType: 'movie' | 'tv' = 'movie', timeWindow: 'day' | 'week' = 'week') => {
  const res = await tmdbApi.get(`/trending/${mediaType}/${timeWindow}`);
  return res.data.results;
};

export const fetchPopular = async (mediaType: 'movie' | 'tv' = 'movie') => {
  const res = await tmdbApi.get(`/${mediaType}/popular`);
  return res.data.results;
};

// New function to fetch public domain movies from the Internet Archive
export const fetchArchiveMovies = async (query: string = 'movie') => {
  // Internet Archive API for public domain movies
  const url = `https://archive.org/advancedsearch.php?q=${encodeURIComponent(
    query + ' mediatype:(movies)'
  )}&fl[]=identifier&fl[]=title&fl[]=description&fl[]=downloads&sort[]=downloads+desc&rows=20&page=1&output=json`;
  const res = await axios.get(url);
  // Construct playable URLs for each movie
  return res.data.response.docs.map((item: any) => ({
    title: item.title,
    description: item.description,
    identifier: item.identifier,
    videoUrl: `https://archive.org/download/${item.identifier}/${item.identifier}.mp4`,
  }));
};

export default tmdbApi;