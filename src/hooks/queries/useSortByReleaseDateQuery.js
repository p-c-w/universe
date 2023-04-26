import { useQuerie } from '@tanstack/react-query';
import { fetchSortByReleaseDate } from '../../api/tmdb';

const useSortByReleaseDateQuery = (mediaType, providerId) => {
  const strProviderId = providerId.sort((a, b) => a - b).join('|');

  const { data, isSuccess } = useQuerie({
    queryKey: [`@${mediaType}`, strProviderId],
    suspense: true,
    staleTime: 1000 * 60 * 5,
    queryFn: () => fetchSortByReleaseDate(mediaType, strProviderId),
    select: datas => datas.pages.map(data => data.results).flat(),
  });

  return { data, isSuccess };
};

export default useSortByReleaseDateQuery;
