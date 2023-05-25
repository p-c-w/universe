import { atom } from 'recoil';
import { SIDE_NAV_STATE_KEY } from '../../constants';

const localStorageEffect = ({ onSet }) => {
  onSet(newState => {
    localStorage.setItem(SIDE_NAV_STATE_KEY, newState);
  });
};

const sideNavState = atom({
  key: SIDE_NAV_STATE_KEY,
  default: JSON.parse(localStorage.getItem(SIDE_NAV_STATE_KEY) || 'false'),
  effects: [localStorageEffect],
});

export default sideNavState;
