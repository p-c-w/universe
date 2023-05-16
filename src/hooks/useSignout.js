import { useSetRecoilState } from 'recoil';
import axios from 'axios';
import { userState } from '../recoil/atom';

const useSignout = () => {
  const setUser = useSetRecoilState(userState);

  const signout = async () => {
    await axios.get('/api/auth/signout');
    setUser(null);
    localStorage.removeItem('user');
  };

  return signout;
};

export default useSignout;
