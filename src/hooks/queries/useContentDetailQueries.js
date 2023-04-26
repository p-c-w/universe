import { useQueries } from '@tanstack/react-query';
import { fetchMediaContentDetails } from '../../api';

const useContentDetailQueries = (userCollectionList, options) => {
  const detailQueries = userCollectionList?.map(item => ({
    queryKey: ['@collection', item],
    queryFn: () => fetchMediaContentDetails(item.type, item.id),
    suspense: true,
    ...options,
  }));

  const queries = useQueries({
    queries: detailQueries,
  });

  const contentDetailDatas = queries.map(query => query.data);

  return { queries, contentDetailDatas };
};

export default useContentDetailQueries;
