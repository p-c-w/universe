import React from 'react';
import { Group, ActionIcon } from '@mantine/core';
import { IconHeart, IconHistory, IconMovie } from '@tabler/icons-react';
import { useRecoilValue } from 'recoil';
import { useUserQuery } from '../../hooks/queries';
import { useAddUserContentMutation } from '../../hooks/mutations';
import { userState } from '../../recoil/atom';

const ActionIcons = ({ size, id, type }) => {
  const { email } = useRecoilValue(userState);

  const { data } = useUserQuery({
    select: userInfo => ({
      watchlist: userInfo.watch_list,
      likelist: userInfo.like_list,
      historylist: userInfo.history_list,
    }),
  });

  const { watchlist, likelist, historylist } = data || {
    watchlist: [],
    likelist: [],
    historylist: [],
  };

  const { mutate: updateContent } = useAddUserContentMutation();

  const handleClick = list => {
    if (!email) return;
    const now = new Date();
    updateContent({ email, list, value: { id, type, modified_at: now.toISOString() } });
  };

  return (
    <Group spacing={8}>
      <ActionIcon
        variant={watchlist?.find(({ id: _id, type: _type }) => +_id === id && _type === type) ? 'filled' : 'outline'}
        color={'yellow'}
        onClick={() => handleClick('watch_list')}>
        <IconMovie size={size} />
      </ActionIcon>
      <ActionIcon
        variant={likelist?.find(({ id: _id, type: _type }) => _id === id && _type === type) ? 'filled' : 'outline'}
        color={'red'}
        onClick={() => handleClick('like_list')}>
        <IconHeart size={size} />
      </ActionIcon>
      <ActionIcon
        variant={historylist?.find(({ id: _id, type: _type }) => _id === id && _type === type) ? 'filled' : 'outline'}
        onClick={() => handleClick('history_list')}
        color={'blue'}>
        <IconHistory size={size} />
      </ActionIcon>
    </Group>
  );
};

export default ActionIcons;
