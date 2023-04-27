import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_URL = import.meta.env.VITE_TMDB_API_URL;
const language = 'ko-KR';

/**
 * 미디어 콘텐츠 인기순 정렬 데이터
 * @param {'movie' | 'tv'} mediaType
 * @param {number} page
 * @param {string} providerId
 * @returns data
 */
export const fetchSortByPopularity = async (mediaType, page, providerId = '8|119|337|356|97|350') => {
  const res = await axios.get(`${API_URL}discover/${mediaType}`, {
    params: {
      api_key: API_KEY,
      language,
      sort_by: 'popularity.desc',
      page,
      watch_region: 'KR',
      with_watch_providers: providerId,
    },
  });

  return res.data;
};

/**
/**
 * 미디어 콘텐츠 릴리즈 날짜순 정렬 데이터
 * @param {'movie' | 'tv'} mediaType
 * @returns data
 */
export const fetchSortByReleaseDate = async (mediaType, providerId) => {
  const res = await axios.get(`${API_URL}discover/${mediaType}`, {
    params: {
      api_key: API_KEY,
      language,
      sort_by: 'release_date.desc',
      watch_region: 'KR',
      with_watch_providers: providerId,
    },
  });

  return res.data;
};

/**
 *  미디어 콘텐츠 장르 인기순 데이터
 * @param {'movie' | 'tv'} mediaType
 * @param {string | number} genreId
 * @param {string | number} providerId
 * @returns
 */
export const fetchWithGenre = async (mediaType, genreId, providerId) => {
  const res = await axios.get(`${API_URL}discover/${mediaType}`, {
    params: {
      api_key: API_KEY,
      language,
      sort_by: 'popularity.desc',
      watch_region: 'KR',
      with_genres: genreId,
      with_watch_providers: providerId,
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
export const fetchMediaContentDetails = async (mediaType, contentId) => {
  const res = await axios.get(`${API_URL + mediaType}/${contentId}`, {
    params: {
      api_key: API_KEY,
      language,
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
