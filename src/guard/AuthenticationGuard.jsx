import { Navigate } from 'react-router-dom';
import useAuthenticationQuery from '../hooks/queries/useAuthenticationQuery';

const AuthenticationGuard = ({ redirectTo, element }) => {
  const { isFetched, error } = useAuthenticationQuery();

  return isFetched ? error === null ? element : <Navigate to={redirectTo} /> : null;
};

export default AuthenticationGuard;
