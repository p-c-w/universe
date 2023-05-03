import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { IS_AUTHENTICATED_QUERY_KEY } from '../../constants';

const useAuthenticationQuery = () => {
  const { isSuccess, isLoading, isFetched, error, data } = useQuery({
    queryKey: [IS_AUTHENTICATED_QUERY_KEY],
    queryFn: () => axios('/api/auth/verify'),
    retry: false,
  });

  return { isSuccess, isLoading, isFetched, error, data };
};

export default useAuthenticationQuery;
