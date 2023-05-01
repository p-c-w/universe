import { atom } from 'recoil';
import { updateUser } from '../../api';

const KEY = 'user';

const mock = {
  email: 'snowlover@gmail.com',
  password: 'snow123',
  name: 'snowlover',
  subscribe_list: [{ id: 8, price: 'basic' }],
  like_list: [
    { id: 849869, type: 'movie', modified_at: '2021-12-25T12:59:32.746Z' },
    { id: 505642, type: 'movie', modified_at: '2020-12-31T12:59:32.746Z' },
  ],
  watch_list: [
    { id: 849869, type: 'movie', modified_at: '2021-12-25T12:59:32.746Z' },
    { id: 119769, type: 'tv', modified_at: '2020-12-31T12:59:32.746Z' },
  ],
  history_list: [
    { id: 668482, type: 'movie', modified_at: '2023-04-15T12:59:32.746Z' },
    { id: 61889, type: 'tv', modified_at: '2022-01-01T12:59:32.746Z' },
  ],
};

const localStorageEffect = ({ onSet }) => {
  onSet(newState => {
    localStorage.setItem(KEY, JSON.stringify(newState));
  });
};

const updateSubcrbieList = ({ onSet }) => {
  onSet(userState => {
    updateUser(userState);
  });
};

const userState = atom({
  key: 'userState',
  default: JSON.parse(localStorage.getItem(KEY)),
  // default: mock,
  effects: [localStorageEffect, updateSubcrbieList],
});

export default userState;
