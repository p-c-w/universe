import { useQueries } from '@tanstack/react-query';
import { fetchProvider } from '../../api';

const staleTime = 1000 * 3;

const useProviderQueries = (list, options) => {
  const providerQueries = list?.map(({ type, id }) => ({
    queryKey: ['@provider', type, id],
    queryFn: () => fetchProvider(type, id),
    suspense: true,
    staleTime,
    notifyOnChangeProps: 'tracked',
    ...options,
  }));

  const queries = useQueries({
    queries: providerQueries,
  });

  return queries;
};

export default useProviderQueries;
