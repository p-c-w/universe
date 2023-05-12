import { atom } from 'recoil';

const defaultData = Array.from({ length: 12 }, () => 0);

const statsByMonthlyState = atom({
  key: 'statsByMonthlyState',
  default: defaultData,
});

export default statsByMonthlyState;
