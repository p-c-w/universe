import axios from 'axios';
import { TMDB_API_URL } from '../constants';

const { VITE_TMDB_API_KEY } = import.meta.env;
const language = 'ko-KR';

export const fetchSortByPopularity = async (mediaType, page, providerId = '8|119|337|356|97|350') => {
  const res = await axios.get(`${TMDB_API_URL}discover/${mediaType}`, {
    params: {
      api_key: VITE_TMDB_API_KEY,
      language,
      sort_by: 'popularity.desc',
      page,
      watch_region: 'KR',
      with_watch_providers: providerId,
    },
  });

  return res.data;
};

export const fetchSortByReleaseDate = async (mediaType, providerId) => {
  const res = await axios.get(`${TMDB_API_URL}discover/${mediaType}`, {
    params: {
      api_key: VITE_TMDB_API_KEY,
      language,
      sort_by: 'release_date.desc',
      watch_region: 'KR',
      with_watch_providers: providerId,
    },
  });

  return res.data;
};

export const fetchWithGenre = async (mediaType, genreId, providerId) => {
  const res = await axios.get(`${TMDB_API_URL}discover/${mediaType}`, {
    params: {
      api_key: VITE_TMDB_API_KEY,
      language,
      sort_by: 'popularity.desc',
      watch_region: 'KR',
      with_genres: genreId,
      with_watch_providers: providerId,
    },
  });
  return res.data;
};

export const fetchMediaContentDetails = async (mediaType, contentId) => {
  const res = await axios.get(`${TMDB_API_URL + mediaType}/${contentId}`, {
    params: {
      api_key: VITE_TMDB_API_KEY,
      language,
    },
  });
  return res.data;
};

export const fetchSearchResult = async (mediaType, query) => {
  const res = await axios.get(`${TMDB_API_URL}search/${mediaType}`, {
    params: {
      api_key: VITE_TMDB_API_KEY,
      language,
      query,
    },
  });
  return res.data;
};

export const fetchProvider = async (mediaType, id) => {
  const res = await axios.get(`${API_URL + mediaType}/${id}/watch/providers`, {
    params: {
      api_key: VITE_TMDB_API_KEY,
    },
  });
  return res.data;
};

export const fetchProviderAndDetail = async (mediaType, id) => {
  const providerRes = await axios.get(`${API_URL + mediaType}/${id}/watch/providers`, {
    params: {
      api_key: VITE_TMDB_API_KEY,
    },
  });

  const DetailRes = await axios.get(`${API_URL + mediaType}/${id}`, {
    params: {
      api_key: VITE_TMDB_API_KEY,
      language,
    },
  });

  return { ...providerRes.data, ...DetailRes.data };
};
