import { atom, useSetRecoilState } from 'recoil';
import selectedItemState from './selectedItemState';

const useCloseItem = ({ onSet }) => {
  const setSelectedItem = useSetRecoilState(selectedItemState);

  onSet(() => {
    setSelectedItem(null);
  });
};

const categoryState = atom({
  key: 'categoryState',
  default: 'watch',
  effects: [useCloseItem],
});

export default categoryState;
