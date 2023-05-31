import { useQuery } from '@tanstack/react-query';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { IS_AUTHENTICATED_QUERY_KEY } from '../../constants';
import { isLoginState, userState } from '../../recoil/atom';
import { checkVerify } from '../../api';

const staleTime = 1000;

const useAuthenticationQuery = () => {
  const setUserId = useSetRecoilState(userState);
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const { isSuccess, isFetched, data } = useQuery({
    queryKey: [IS_AUTHENTICATED_QUERY_KEY],
    queryFn: checkVerify,
    staleTime,
    suspense: false,
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

  return { isFetched, isLogin };
};

export default useAuthenticationQuery;
