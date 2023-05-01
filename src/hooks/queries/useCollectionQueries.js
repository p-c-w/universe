import { useQueries } from '@tanstack/react-query';
import { fetchProviderAndDetail } from '../../api';

const useCollectionQueries = (list, options) => {
  const collectionQueries = list?.map(({ type, id }) => ({
    queryKey: ['@collection', type, id],
    queryFn: () => fetchProviderAndDetail(type, id),
    suspense: true,
    ...options,
  }));

  const queries = useQueries({
    queries: collectionQueries,
  });

  return queries;
};

export default useCollectionQueries;
