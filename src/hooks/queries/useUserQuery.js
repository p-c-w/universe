import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { USER_INFO_QUERY_KEY } from '../../constants';
import { fetchUser } from '../../api';
import { userState } from '../../recoil/atom';

const staleTime = 1000 * 3;

const useUserQuery = options => {
  const email = useRecoilValue(userState);

  const query = useQuery({
    queryKey: [USER_INFO_QUERY_KEY, email],
    queryFn: () => fetchUser(email),
    staleTime,
    ...options,
  });

  return { ...query, userInfo: query.data };
};

export default useUserQuery;
