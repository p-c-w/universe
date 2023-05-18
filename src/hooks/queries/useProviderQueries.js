import { useQueries } from '@tanstack/react-query';
import { fetchProvider } from '../../api';
import { PROVIDERS } from '../../constants';

const staleTime = 1000 * 60 * 5;

const useProviderQueries = (list, options) => {
  const providerQueries = list?.map(({ type, id }) => ({
    queryKey: ['@provider', type, id],
    queryFn: () => fetchProvider(type, id),
    suspense: true,
    staleTime,
    refetchOnWindowFocus: false,
    select: data => ({
      id: data.id,
      providers: data.results.KR?.flatrate
        ? data.results.KR?.flatrate
            ?.map(provider => provider.provider_id)
            ?.filter(id => Object.prototype.hasOwnProperty.call(PROVIDERS, id))
        : undefined,
    }),
    ...options,
  }));

  const queries = useQueries({
    queries: providerQueries,
  });

  return queries;
};

export default useProviderQueries;
