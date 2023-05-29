import { atom } from 'recoil';
import { SELECTED_ITEM_STATE_KEY } from '../../constants';

const selectedItemState = atom({
  key: SELECTED_ITEM_STATE_KEY,
  default: '',
});

export default selectedItemState;
