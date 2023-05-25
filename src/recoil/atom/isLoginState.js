import { atom } from 'recoil';

const key = 'isLoginState';

const localStorageEffect = ({ onSet }) => {
  onSet(isLogin => {
    localStorage.setItem(key, JSON.stringify(isLogin));
  });
};

const isLoginState = atom({
  key,
  default: JSON.parse(localStorage.getItem(key)) ?? false,
  effects: [localStorageEffect],
});

export default isLoginState;
