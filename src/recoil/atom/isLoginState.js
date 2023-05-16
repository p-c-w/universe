import { atom } from 'recoil';

const key = 'isLoginState';

const isLoginState = atom({
  key,
  default: false,
});

export default isLoginState;
