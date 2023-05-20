import { selectorFamily } from 'recoil';
import { selectedItemState, sideNavState } from '../atom';

const posterImgState = selectorFamily({
  key: 'posterImgState',
  get:
    mediaQuery =>
    ({ get }) => {
      const itemState = get(selectedItemState);
      const isNavOpened = get(sideNavState);

      if (isNavOpened && mediaQuery) {
        return null;
      }

      return itemState;
    },
  set: ({ set }, newValue) => set(selectedItemState, newValue),
});

export default posterImgState;
