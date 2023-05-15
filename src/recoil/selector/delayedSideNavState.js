import { selector } from 'recoil';
import { sideNavState } from '../atom';

const delayedSideNavState = selector({
  key: 'delayedDerivedState',
  get: async ({ get }) => {
    await new Promise(resolve => {
      setTimeout(resolve, 400);
    });
    const sideNavStateValue = get(sideNavState);
    return sideNavStateValue;
  },
});

export default delayedSideNavState;
