import { atom } from 'recoil';
import { updateUserSubscription } from '../../api';

const KEY = 'user';

const localStorageEffect = ({ onSet }) => {
  onSet(newState => {
    localStorage.setItem(KEY, JSON.stringify(newState));
  });
};

const updateSubcrbieList = ({ onSet }) => {
  onSet(userState => {
    updateUserSubscription(userState);
  });
};

const userState = atom({
  key: 'userState',
  default: JSON.parse(localStorage.getItem(KEY)),
  effects: [localStorageEffect, updateSubcrbieList],
});

export default userState;
