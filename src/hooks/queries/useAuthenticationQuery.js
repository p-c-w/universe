import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const staleTime = 1000;

const useAuthenticationQuery = () => {
  const { isSuccess, isLoading, isFetched, error } = useQuery({
    queryKey: ['isAuthenticated'],
    queryFn: () => axios('/api/auth/verify'),
    retry: false,
    staleTime,
  });

  return { isSuccess, isLoading, isFetched, error };
};

export default useAuthenticationQuery;
