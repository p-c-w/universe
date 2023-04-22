import { atom } from 'recoil';

const KEY = 'user';

const localStorageEffect = ({ onSet }) => {
  onSet(newState => {
    localStorage.setItem(KEY, JSON.stringify(newState));
  });
};

const userState = atom({
  key: 'userState',
  default: JSON.parse(localStorage.getItem(KEY)),
  effects: [localStorageEffect],
});

// const userState = atom({
//   key: 'userState',
//   default: {
//     email: '',
//     name: '',
//     subscribelist: [],
//     watchlist: [],
//     likelist: [],
//     historylist: [],
//   },
// });

export default userState;
