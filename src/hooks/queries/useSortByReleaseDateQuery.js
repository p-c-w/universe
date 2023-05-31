import { useQuery } from '@tanstack/react-query';
import { fetchSortByReleaseDate } from '../../api/tmdb';

const staleTime = 1000 * 60 * 5;

const useSortByReleaseDateQuery = ({ mediaType, selectedIds }) => {
  const strProviderId = selectedIds.sort((a, b) => a - b).join('|');

  const query = useQuery({
    queryKey: [`@${mediaType}`, 'sortByRelease', `providerIds: ${strProviderId}`],
    queryFn: () => fetchSortByReleaseDate(mediaType, strProviderId),
    staleTime,
    refetchOnWindowFocus: false,
    select: datas => datas.results,
  });

  return { ...query, content: query.data };
};

export default useSortByReleaseDateQuery;
