import { useQuery } from '@tanstack/react-query';
import { fetchSortByPopularity } from '../../api/tmdb';

const staleTime = 1000 * 60 * 5;

const useSortByPopularityQuery = (mediaType, providerIds) => {
  const strProviderId = providerIds.sort((a, b) => a - b).join('|');

  const { data, isSuccess } = useQuery({
    queryKey: [`@${mediaType}`, strProviderId, 'sortByPopularity'],
    queryFn: ({ pageParam = 1 }) => fetchSortByPopularity(mediaType, pageParam, strProviderId),
    suspense: true,
    staleTime,
    refetchOnWindowFocus: false,
    select: datas => datas.results,
  });

  return { data, isSuccess };
};

export default useSortByPopularityQuery;
