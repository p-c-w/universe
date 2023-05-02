import { atom } from 'recoil';

const KEY = 'user';

const localStorageEffect = ({ onSet }) => {
  onSet(newUser => {
    localStorage.setItem(KEY, JSON.stringify(newUser));
  });
};

const userState = atom({
  key: 'userState',
  default: JSON.parse(localStorage.getItem(KEY)),
  effects: [localStorageEffect],
});

export default userState;
