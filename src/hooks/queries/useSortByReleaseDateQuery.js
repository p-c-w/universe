import { useQuery } from '@tanstack/react-query';
import { fetchSortByReleaseDate } from '../../api/tmdb';

const useSortByReleaseDateQuery = (mediaType, providerIds) => {
  const strProviderId = providerIds.sort((a, b) => a - b).join('|');

  const { data, isSuccess } = useQuery({
    queryKey: [`@${mediaType}`, strProviderId, 'sortByRelease'],
    suspense: true,
    staleTime: 1000 * 60 * 5,
    queryFn: () => fetchSortByReleaseDate(mediaType, strProviderId),
    select: datas => datas.results,
  });

  return { data, isSuccess };
};

export default useSortByReleaseDateQuery;
