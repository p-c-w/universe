import { atom, useSetRecoilState } from 'recoil';
import selectedItemState from './selectedItemState';
import { CATEGORY_STATE_KEY } from '../../constants';

const useCloseItem = ({ onSet }) => {
  const setSelectedItem = useSetRecoilState(selectedItemState);

  onSet(() => {
    setSelectedItem(null);
  });
};

const categoryState = atom({
  key: CATEGORY_STATE_KEY,
  default: 'watch',
  effects: [useCloseItem],
});

export default categoryState;
