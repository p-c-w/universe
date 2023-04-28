import { useQueries } from '@tanstack/react-query';
import { fetchSearchResult } from '../../api/tmdb';

const useSearchResultQueries = (mediaType, query) => {
  const queries = mediaType.map(type => ({
    enabled: !!query,
    queryKey: ['@Search', `${type}`, query],
    queryFn: () => fetchSearchResult(type, query),
    suspense: true,
    staleTime: 1000 * 60 * 5,
    select: data => data.results,
  }));

  const datas = useQueries({ queries });
  const data = datas.map(query => query.data);

  return data;
};

export default useSearchResultQueries;
