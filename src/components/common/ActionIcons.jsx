import { useRecoilValue } from 'recoil';
import { Group, ActionIcon } from '@mantine/core';
import { IconHeart, IconHistory, IconMovie } from '@tabler/icons-react';
import { userState } from '../../recoil/atom';
import { useUserQuery } from '../../hooks/queries';
import { useAddUserContentMutation, useDeleteUserContentMutation } from '../../hooks/mutations';

const getUserInfo = userInfo => ({
  watchlist: userInfo.watch_list,
  likelist: userInfo.like_list,
  historylist: userInfo.history_list,
});

const defaultData = {
  watchlist: [],
  likelist: [],
  historylist: [],
};

const ActionIcons = ({ size, id, type }) => {
  const email = useRecoilValue(userState);

  const { data } = useUserQuery({ select: getUserInfo, enabled: !!email });

  const { mutate: updateUserContent } = useAddUserContentMutation();
  const { mutate: deleteUserContent } = useDeleteUserContentMutation();

  const { watchlist, likelist, historylist } = data || defaultData;

  const isItemInList = list => list.some(item => item.id === id && item.type === type);

  const handleClick = (list, listName) => {
    if (!email) return;

    if (!isItemInList(list)) {
      const now = new Date();
      updateUserContent({ email, list: listName, value: { id, type, modified_at: now.toISOString() } });
    }
    if (isItemInList(list)) {
      deleteUserContent({ email, list: listName, id });
    }
  };

  const getIconVariant = (list, color) =>
    isItemInList(list) ? { variant: 'filled', color } : { variant: 'outline', color };

  return (
    <Group spacing={8}>
      <ActionIcon {...getIconVariant(watchlist, 'yellow')} onClick={() => handleClick(watchlist, 'watch_list')}>
        <IconMovie size={size} />
      </ActionIcon>
      <ActionIcon {...getIconVariant(likelist, 'red')} onClick={() => handleClick(likelist, 'like_list')}>
        <IconHeart size={size} />
      </ActionIcon>
      <ActionIcon {...getIconVariant(historylist, 'blue')} onClick={() => handleClick(historylist, 'history_list')}>
        <IconHistory size={size} />
      </ActionIcon>
    </Group>
  );
};

export default ActionIcons;
