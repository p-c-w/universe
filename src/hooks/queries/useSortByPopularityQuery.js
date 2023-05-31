import { useQuery } from '@tanstack/react-query';
import { fetchSortByPopularity } from '../../api/tmdb';

const staleTime = 1000 * 60 * 5;

const useSortByPopularityQuery = ({ mediaType, selectedIds }) => {
  const strProviderId = selectedIds.sort((a, b) => a - b).join('|');

  const query = useQuery({
    queryKey: [`@${mediaType}`, 'sortByPopularity', `providerIds: ${strProviderId}`],
    queryFn: ({ pageParam = 1 }) => fetchSortByPopularity(mediaType, pageParam, strProviderId),
    staleTime,
    refetchOnWindowFocus: false,
    select: datas => datas.results,
  });

  return { ...query, content: query.data };
};

export default useSortByPopularityQuery;
