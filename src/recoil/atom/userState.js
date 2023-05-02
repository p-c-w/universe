import { atom } from 'recoil';

const key = 'userState';

const localStorageEffect = ({ onSet }) => {
  onSet(newUser => {
    localStorage.setItem(key, JSON.stringify(newUser));
  });
};

const userState = atom({
  key,
  default: JSON.parse(localStorage.getItem(key)),
  effects: [localStorageEffect],
});

export default userState;
