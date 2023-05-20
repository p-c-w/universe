import { atom } from 'recoil';

const selectedItemImgState = atom({
  key: 'selectedItemImg',
  default: null,
});

export default selectedItemImgState;
