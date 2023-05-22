import { useQueries } from '@tanstack/react-query';
import { fetchProviderAndDetail } from '../../api';
import { PROVIDERS, COLLECTION_QUERY_KEY } from '../../constants';

const staleTime = 1000 * 5 * 60;

const useCollectionQueries = (list, options) => {
  const collectionQueries = list.map(({ type, id }) => ({
    queryKey: [COLLECTION_QUERY_KEY, type, id],
    queryFn: () => fetchProviderAndDetail(type, id),
    staleTime,
    refetchOnWindowFocus: false,
    select: data => ({
      id,
      title: data.title || data.name,
      type,
      posterPath: data.poster_path,
      providers: data.results.KR
        ? data.results.KR.flatrate
            ?.map(provider => provider.provider_id)
            ?.filter(id => Object.prototype.hasOwnProperty.call(PROVIDERS, id))
        : undefined,
      genres: data.genres,
    }),
    ...options,
  }));

  const queries = useQueries({
    queries: collectionQueries,
  });

  const isAllSuccess = !queries.some(({ isSuccess }) => !isSuccess);

  return { queries, isAllSuccess };
};

export default useCollectionQueries;
