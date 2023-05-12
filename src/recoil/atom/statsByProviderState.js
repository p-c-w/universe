import { atom } from 'recoil';
import { PROVIDERS } from '../../constants';

const defaultData = {
  total: '0',
  data: [
    {
      id: 8,
      label: 'Netflix',
      count: 0,
      part: 0,
      color: `${PROVIDERS[8].color}`,
    },
    {
      id: 97,
      label: 'Watcha',
      count: 0,
      part: 0,
      color: `${PROVIDERS[97].color}`,
    },
    {
      id: 119,
      label: 'Amazon Prime',
      count: 0,
      part: 0,
      color: `${PROVIDERS[119].color}`,
    },
    {
      id: 337,
      label: 'Disney+',
      count: 0,
      part: 0,
      color: `${PROVIDERS[337].color}`,
    },
    {
      id: 350,
      label: 'Apple TV+',
      count: 0,
      part: 0,
      color: `${PROVIDERS[350].color}`,
    },
    {
      id: 356,
      label: 'Wavve',
      count: 0,
      part: 0,
      color: `${PROVIDERS[356].color}`,
    },
  ],
};

const statsByProviderState = atom({
  key: 'statsByProviderState',
  default: defaultData,
});

export default statsByProviderState;
