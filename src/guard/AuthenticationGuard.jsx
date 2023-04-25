import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Navigate } from 'react-router-dom';

/**
 * Protected Route
 */
const AuthenticationGuard = ({ redirectTo, element }) => {
  const { isFetched, error } = useQuery({
    queryKey: ['isAuthenticated'],
    queryFn: () => axios('/api/auth/verify'),
    retry: false,
    staleTime: 1000,
  });

  // token 검증 완료 이전에는 렌더링하지 않는다.
  return isFetched ? error === null ? element : <Navigate to={redirectTo} /> : null;
};

export default AuthenticationGuard;
