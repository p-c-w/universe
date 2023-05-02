import { atom } from 'recoil';

const categoryState = atom({
  key: 'categoryState',
  default: 'watch',
});

export default categoryState;
