import { useSetRecoilState } from 'recoil';
import axios from 'axios';
import { userState, isLoginState } from '../recoil/atom';

const useSignout = () => {
  const setUser = useSetRecoilState(userState);
  const setIsLogin = useSetRecoilState(isLoginState);

  const signout = async () => {
    const { data } = await axios.get('/api/auth/signout');

    setUser(null);
    localStorage.removeItem('user');
    setIsLogin(data.isLogin);
  };

  return signout;
};

export default useSignout;
