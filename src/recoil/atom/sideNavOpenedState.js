import { atom } from 'recoil';

const KEY = 'sideNavOpenState';

const localStorageEffect = ({ onSet }) => {
  onSet(newState => {
    localStorage.setItem(KEY, newState);
  });
};

const sideNavOpenState = atom({
  key: 'sideNavOpenState',
  default: JSON.parse(localStorage.getItem(KEY)) ?? false,
  effects: [localStorageEffect],
});

export default sideNavOpenState;
