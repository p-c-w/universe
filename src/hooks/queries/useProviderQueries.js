import { useQueries } from '@tanstack/react-query';
import { fetchProvider } from '../../api';

const staleTime = 1000 * 5;

const useProviderQueries = (list, options) => {
  const providerQueries = list?.map(({ type, id }) => ({
    queryKey: ['@provider', type, id],
    queryFn: () => fetchProvider(type, id),
    suspense: true,
    staleTime,
    refetchOnWindowFocus: false,
    ...options,
  }));

  const queries = useQueries({
    queries: providerQueries,
  });

  return queries;
};

export default useProviderQueries;
