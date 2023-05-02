import { useQuery } from '@tanstack/react-query';
import { fetchSortByReleaseDate } from '../../api/tmdb';

const staleTime = 1000 * 60 * 5;

const useSortByReleaseDateQuery = (mediaType, providerIds) => {
  const strProviderId = providerIds.sort((a, b) => a - b).join('|');

  const { data, isSuccess } = useQuery({
    queryKey: [`@${mediaType}`, strProviderId, 'sortByRelease'],
    queryFn: () => fetchSortByReleaseDate(mediaType, strProviderId),
    staleTime,
    suspense: true,
    select: datas => datas.results,
  });

  return { data, isSuccess };
};

export default useSortByReleaseDateQuery;
