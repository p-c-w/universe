import { useQuery } from '@tanstack/react-query';
import { fetchMediaContentDetails } from '../../api';

const useContentDetailQuery = (item, options) => {
  const { data, isSuccess } = useQuery({
    queryKey: ['@detail', item],
    queryFn: () => fetchMediaContentDetails(item.type, item.id),
    suspense: true,
    ...options,
  });

  return { data, isSuccess };
};

export default useContentDetailQuery;
