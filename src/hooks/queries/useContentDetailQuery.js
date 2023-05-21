import { useQuery } from '@tanstack/react-query';
import { fetchMediaContentDetails } from '../../api';
import { CONTENT_DETAIL_QUERY_KEY } from '../../constants';

const staleTime = 1000 * 5;

const useContentDetailQuery = (item, options) => {
  const { data, isSuccess } = useQuery({
    queryKey: [CONTENT_DETAIL_QUERY_KEY, item],
    queryFn: () => fetchMediaContentDetails(item.type, item.id),
    staleTime,
    ...options,
  });

  return { data, isSuccess };
};

export default useContentDetailQuery;
