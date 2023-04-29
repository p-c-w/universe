import React from 'react';
import { Group, ActionIcon } from '@mantine/core';

import { IconHeart, IconHistory, IconMovie } from '@tabler/icons-react';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import userState from '../../recoil/atom/userState';

const ActionIcons = ({ size, id, type }) => {
  const { email, watch_list: watchlist, like_list: likelist, history_list: historylist } = useRecoilValue(userState);
  const now = new Date();

  // api 요청 확인용 함수
  const handleClick = async listName => {
    await axios.patch(`/api/users/${email}/${listName}`, { id, type, modified_at: now.toISOString() });
  };

  return (
    <Group spacing={8}>
      <ActionIcon
        variant={watchlist.find(({ id: _id, type: _type }) => _id === id && _type === type) ? 'filled' : 'outline'}
        color={'yellow'}
        onClick={() => handleClick('watch_list')}>
        <IconMovie size={size} />
      </ActionIcon>
      <ActionIcon
        variant={!likelist.find(({ id: _id, type: _type }) => _id === id && _type === type) ? 'filled' : 'outline'}
        color={'red'}
        onClick={() => handleClick('like_list')}>
        <IconHeart size={size} />
      </ActionIcon>
      <ActionIcon
        variant={historylist.find(({ id: _id, type: _type }) => _id === id && _type === type) ? 'filled' : 'outline'}
        onClick={() => handleClick('history_list')}
        color={'blue'}>
        <IconHistory size={size} />
      </ActionIcon>
    </Group>
  );
};

export default ActionIcons;
