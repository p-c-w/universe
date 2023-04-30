import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const useAuthenticationQuery = () => {
  const { isFetched, error } = useQuery({
    queryKey: ['isAuthenticated'],
    queryFn: () => axios('/api/auth/verify'),
    retry: false,
    staleTime: 1000,
  });

  return { isFetched, error };
};

export default useAuthenticationQuery;
