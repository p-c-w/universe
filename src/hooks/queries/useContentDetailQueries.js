import { useQueries } from '@tanstack/react-query';
import { fetchMediaContentDetails } from '../../api';

const useContentDetailQueries = userCollectionList => {
  const detailQueries = userCollectionList?.map(item => ({
    queryKey: ['@collection', item],
    queryFn: () => fetchMediaContentDetails(item.type, item.id),
    select: item => ({ id: item.id, title: item.title || item.name, posterPath: item.poster_path }),
    suspense: true,
  }));

  const queries = useQueries({
    queries: detailQueries,
  });

  const contentDetailDatas = queries.map(query => query.data);

  return { queries, contentDetailDatas };
};

export default useContentDetailQueries;
