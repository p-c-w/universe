import { atom } from 'recoil';
import { IS_LOGIN_STATE_KEY } from '../../constants';

const localStorageEffect = ({ onSet }) => {
  onSet(isLogin => {
    localStorage.setItem(IS_LOGIN_STATE_KEY, JSON.stringify(isLogin));
  });
};

const isLoginState = atom({
  key: IS_LOGIN_STATE_KEY,
  default: JSON.parse(localStorage.getItem(IS_LOGIN_STATE_KEY) || 'false'),
  effects: [localStorageEffect],
});

export default isLoginState;
