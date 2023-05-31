import { useSetRecoilState } from 'recoil';
import { userState, isLoginState } from '../recoil/atom';
import { signOut } from '../api';

const useSignout = () => {
  const setUser = useSetRecoilState(userState);
  const setIsLogin = useSetRecoilState(isLoginState);

  const signout = async () => {
    const isLogin = await signOut();

    setUser(null);
    localStorage.removeItem('user');
    setIsLogin(isLogin);
  };

  return signout;
};

export default useSignout;
