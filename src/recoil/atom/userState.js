import { atom } from 'recoil';
import { updateUserSubscription } from '../../api';

const KEY = 'user';

const localStorageEffect = ({ onSet }) => {
  onSet(newState => {
    localStorage.setItem(KEY, JSON.stringify(newState));
  });
};

const updateSubscribeList = ({ onSet }) => {
  onSet(userState => {
    updateUserSubscription(userState);
  });
};

const userState = atom({
  key: 'userState',
  default: JSON.parse(localStorage.getItem(KEY)),
  effects: [localStorageEffect, updateSubscribeList],
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
