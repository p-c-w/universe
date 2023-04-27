import { useQuery } from '@tanstack/react-query';
import { fetchSortByPopularity } from '../../api/tmdb';

const useSortByPopularityQuery = (mediaType, providerId) => {
  const strProviderId = providerId.sort((a, b) => a - b).join('|');

  const { data, isSuccess } = useQuery({
    queryKey: [`@${mediaType}`, strProviderId, 'sortByPopularity'],
    queryFn: ({ pageParam = 1 }) => fetchSortByPopularity(mediaType, pageParam, strProviderId),
    select: datas => datas.results,
  });

  return { data, isSuccess };
};

export default useSortByPopularityQuery;
