import { useQuery } from '@tanstack/react-query';
import { fetchWithGenre } from '../../api/tmdb';

const useWithGenreQuery = (mediaType, providerIds, genreId) => {
  const strProviderId = providerIds.sort((a, b) => a - b).join('|');

  const { data, isSuccess } = useQuery({
    queryKey: [`@${mediaType}`, strProviderId, genreId],
    suspense: true,
    staleTime: 1000 * 60 * 5,
    queryFn: () => fetchWithGenre(mediaType, genreId, strProviderId),
    select: data => data.results,
  });

  return { data, isSuccess };
};

export default useWithGenreQuery;
