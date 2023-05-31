import { useQueries } from '@tanstack/react-query';
import { fetchSearchResult } from '../../api/tmdb';
import { SEARCH_RESULT_QUERY_KEY } from '../../constants';

const staleTime = 1000 * 3;
const cacheTime = 1000 * 60;

const useSearchResultQueries = (mediaType, query) => {
  const queries = mediaType.map(type => ({
    enabled: !!query,
    queryKey: [SEARCH_RESULT_QUERY_KEY, type, query],
    queryFn: () => fetchSearchResult(type, query),
    staleTime,
    cacheTime,
    select: data => data.results,
  }));

  const datas = useQueries({ queries });
  const data = datas.map(query => query.data);

  return data;
};

export default useSearchResultQueries;
