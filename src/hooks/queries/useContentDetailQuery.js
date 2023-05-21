import { useQuery } from '@tanstack/react-query';
import { fetchMediaContentDetails } from '../../api';

const staleTime = 1000 * 5;

const useContentDetailQuery = (item, options) => {
  const { data, isSuccess } = useQuery({
    queryKey: ['@detail', item],
    queryFn: () => fetchMediaContentDetails(item.type, item.id),
    staleTime,
    ...options,
  });

  return { data, isSuccess };
};

export default useContentDetailQuery;
