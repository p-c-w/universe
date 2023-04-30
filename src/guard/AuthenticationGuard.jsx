import { Navigate } from 'react-router-dom';
import useAuthenticationQuery from '../hooks/queries/useAuthenticationQuery';

/**
 * Protected Route
 */
const AuthenticationGuard = ({ redirectTo, element }) => {
  const { isFetched, error } = useAuthenticationQuery();

  // token 검증 완료 이전에는 렌더링하지 않는다.
  return isFetched ? error === null ? element : <Navigate to={redirectTo} /> : null;
};

export default AuthenticationGuard;
