import { atom } from 'recoil';

const key = 'sideNavState';

const localStorageEffect = ({ onSet }) => {
  onSet(newState => {
    localStorage.setItem(key, newState);
  });
};

const sideNavState = atom({
  key,
  default: JSON.parse(localStorage.getItem(key)) ?? false,
  effects: [localStorageEffect],
});

export default sideNavState;
