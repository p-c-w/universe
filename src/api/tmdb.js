import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_URL = import.meta.env.VITE_TMDB_API_URL;
const language = 'ko-KR';

/**
 * 미디어 콘텐츠 인기순 정렬 데이터
 * @param {'movie' | 'tv'} mediaType
 * @returns data
 */
export const fetchMediaContentTrendings = async (mediaType, providerId = '8|119|337|356|97|350') => {
  const res = await axios.get(`${API_URL}discover/${mediaType}`, {
    params: {
      api_key: API_KEY,
      language,
      sort_by: 'popularity.desc',
      watch_region: 'KR',
      with_watch_providers: providerId,
    },
  });

  return res.data;
};

/**
 * 미디어 콘텐츠 검색 데이터
 * @param {'movie' | 'tv'} mediaType
 * @param {string} query
 * @returns data
 */
export const fetchMediaContentSearchResult = async (mediaType, query) => {
  const res = await axios.get(`${API_URL}search/${mediaType}`, {
    params: {
      api_key: API_KEY,
      query,
    },
  });
  return res.data;
};

/**
 * 미디어 콘텐츠 디테일 데이터
 * @param {'movie' | 'tv'} mediaType
 * @param {string | number} id
 * @returns
 */
export const fetchMediaContentDetails = async (mediaType, id) => {
  const res = await axios.get(`${API_URL + mediaType}/${id}`, {
    params: {
      api_key: API_KEY,
      language,
    },
  });
  return res.data;
};

/**
 *  미디어 콘텐츠 장르 데이터
 * @param {'movie' | 'tv'} mediaType
 * @param {string | number} genreId
 * @param {string | number} providerId
 * @returns
 */
export const fetchMediaContentsByGenre = async (mediaType, genreId, providerId) => {
  const res = await axios.get(`${API_URL}discover/${mediaType}`, {
    params: {
      api_key: API_KEY,
      sort_by: 'popularity.desc',
      watch_region: 'KR',
      with_genres: genreId,
      with_watch_providers: providerId,
    },
  });
  return res.data;
};
