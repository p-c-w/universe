import { atom } from 'recoil';
import { CATEGORY_STATE_KEY } from '../../constants';

const categoryState = atom({
  key: CATEGORY_STATE_KEY,
  default: 'watch',
});

export default categoryState;
