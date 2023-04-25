import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '../../api/user';
// import queryKey from '../../constants/userQueryKey';

const staleTime = 1000 * 3;

const useUserQuery = (email, options) => {
  const query = useQuery({
    queryKey: ['user', email],
    queryFn: () => fetchUser(email),
    staleTime,
    ...options,
  });

  return { ...query, user: query.data };
};

export default useUserQuery;
