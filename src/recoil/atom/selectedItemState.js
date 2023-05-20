import { atom } from 'recoil';

const selectedItemState = atom({
  key: 'selectedItemState',
  default: null,
});

export default selectedItemState;
