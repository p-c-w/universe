import { useQuery } from '@tanstack/react-query';
import { fetchWithGenre } from '../../api/tmdb';

const staleTime = 1000 * 60 * 5;

const useWithGenreQuery = ({ mediaType, selectedIds, genreId }) => {
  const strProviderId = selectedIds.sort((a, b) => a - b).join('|');

  const query = useQuery({
    queryKey: [`@${mediaType}`, `genreId: ${genreId}`, `providerIds: ${strProviderId}`],
    queryFn: () => fetchWithGenre(mediaType, genreId, strProviderId),
    staleTime,
    refetchOnWindowFocus: false,
    select: data => data.results,
  });

  return { ...query, content: query.data };
};

export default useWithGenreQuery;
