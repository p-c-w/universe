import { atom } from 'recoil';
import { USER_STATE_KEY } from '../../constants';

const localStorageEffect = ({ onSet }) => {
  onSet(newUser => {
    localStorage.setItem(USER_STATE_KEY, JSON.stringify(newUser));
  });
};

const userState = atom({
  key: USER_STATE_KEY,
  default: JSON.parse(localStorage.getItem(USER_STATE_KEY) || '{}'),
  effects: [localStorageEffect],
});

export default userState;
