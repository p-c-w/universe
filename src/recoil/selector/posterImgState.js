import { selector } from 'recoil';
import { selectedItemState } from '../atom';

const posterImgState = selector({
  key: 'posterImgState',
  get: ({ get }) => {
    const itemState = get(selectedItemState);

    return itemState;
  },
  set: ({ set }, newValue) => set(selectedItemState, newValue),
});

export default posterImgState;
