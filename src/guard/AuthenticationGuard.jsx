import { Navigate } from 'react-router-dom';
import useAuthenticationQuery from '../hooks/queries/useAuthenticationQuery';

const AuthenticationGuard = ({ redirectTo, element }) => {
  const { isFetched, isLogin } = useAuthenticationQuery();

  return isFetched ? isLogin ? element : <Navigate to={redirectTo} /> : null;
};

export default AuthenticationGuard;
