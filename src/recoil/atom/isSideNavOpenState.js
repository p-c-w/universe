import { atom } from 'recoil';

const KEY = 'isSideNavOpen';

const localStorageEffect = ({ onSet }) => {
  onSet(newState => {
    localStorage.setItem(KEY, newState);
  });
};

const isSideNavOpenState = atom({
  key: 'isSideNavOpenState',
  default: JSON.parse(localStorage.getItem(KEY)) ?? false,
  effects: [localStorageEffect],
});

export default isSideNavOpenState;
