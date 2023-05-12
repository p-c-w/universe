import { atom } from 'recoil';

const statsByMonthlyState = atom({
  key: 'statsByMonthlyState',
  default: [],
});

export default statsByMonthlyState;
