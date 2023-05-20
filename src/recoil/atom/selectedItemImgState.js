import { atom } from 'recoil';

const selectedItemImgState = atom({
  key: 'selectedItemImg',
  default: false,
});

export default selectedItemImgState;
