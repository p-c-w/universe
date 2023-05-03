import { useRecoilValue } from 'recoil';
import { Group, ThemeIcon, Tooltip } from '@mantine/core';
import { IconHistory, IconMovie, IconThumbUp } from '@tabler/icons-react';
import styled from '@emotion/styled';
import { userState } from '../../recoil/atom';
import { useUserQuery } from '../../hooks/queries';
import { useAddUserContentMutation, useDeleteUserContentMutation } from '../../hooks/mutations';

const getUserInfo = userInfo => ({
  watchlist: userInfo.watch_list,
  likelist: userInfo.like_list,
  historylist: userInfo.history_list,
});

const CategoryIcon = styled(ThemeIcon)`
  cursor: pointer;
`;

const ActionIcons = ({ size, id, type, category = '' }) => {
  const userEmail = useRecoilValue(userState);

  const { data } = useUserQuery({ select: getUserInfo, enabled: !!userEmail });

  const { mutate: addUserContent } = useAddUserContentMutation();
  const { mutate: deleteUserContent } = useDeleteUserContentMutation();

  const { watchlist = [], likelist = [], historylist = [] } = data || {};

  const isItemInList = list => list.some(item => item.id === id && item.type === type);

  const handleClick = (e, list, listName) => {
    e.stopPropagation();
    if (!userEmail) return;

    const now = new Date();
    const contentData = { id, type, modified_at: now.toISOString() };

    if (isItemInList(list)) {
      deleteUserContent({ email: userEmail, list: listName, id });
    } else {
      addUserContent({ email: userEmail, list: listName, value: contentData });
    }
  };

  const getIconVariant = (list, color) =>
    isItemInList(list) ? { variant: 'filled', color } : { variant: 'outline', color };

  return (
    <Group spacing={8}>
      {category !== 'watch' && (
        <Tooltip label="Watch" withArrow>
          <CategoryIcon
            role="button"
            aria-label={`to ${watchlist}`}
            {...getIconVariant(watchlist, 'yellow')}
            onClick={e => handleClick(e, watchlist, 'watch_list')}>
            <IconMovie size={size} />
          </CategoryIcon>
        </Tooltip>
      )}
      {category !== 'like' && (
        <Tooltip label="Like" withArrow>
          <CategoryIcon
            role="button"
            aria-label={likelist}
            {...getIconVariant(likelist, 'red')}
            onClick={e => handleClick(e, likelist, 'like_list')}>
            <IconThumbUp size={size} />
          </CategoryIcon>
        </Tooltip>
      )}
      {category !== 'history' && (
        <Tooltip label="History" withArrow>
          <CategoryIcon
            role="button"
            aria-label={historylist}
            {...getIconVariant(historylist, 'blue')}
            onClick={e => handleClick(e, historylist, 'history_list')}>
            <IconHistory size={size} />
          </CategoryIcon>
        </Tooltip>
      )}
    </Group>
  );
};

export default ActionIcons;
