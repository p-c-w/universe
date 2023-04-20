import { atom } from 'recoil';

const userState = atom({
  key: 'userState',
  default: {
    email: '',
    name: '',
    subscribelist: [],
    watchlist: [],
    likelist: [],
    historylist: [],
  },
});

export default userState;
