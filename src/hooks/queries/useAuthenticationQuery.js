import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { IS_AUTHENTICATED_QUERY_KEY } from '../../constants';
import { isLoginState, userState } from '../../recoil/atom';

const useAuthenticationQuery = () => {
  const setUserId = useSetRecoilState(userState);
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);

  const { isSuccess, isFetched, data } = useQuery({
    queryKey: [IS_AUTHENTICATED_QUERY_KEY],
    queryFn: async () => {
      const res = await axios('/api/auth/verify');

      return res.data;
    },
    staleTime: 1000,
    retry: false,
  });

  useEffect(() => {
    if (isSuccess && !data.email) {
      setUserId(null);
      setIsLogin(data.isLogin);
    }

    if (isSuccess && data.email) {
      setUserId(data.email);
      setIsLogin(data.isLogin);
    }
  }, [data, isSuccess, setIsLogin, setUserId]);

  return { isSuccess, isFetched, data, isLogin };
};

export default useAuthenticationQuery;
