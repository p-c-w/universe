import React from 'react';
import { useMantineTheme, Group, ActionIcon } from '@mantine/core';

import { IconHeart, IconHistory, IconMovie } from '@tabler/icons-react';

import styled from '@emotion/styled';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import userState from '../../recoil/atom/userState';

const Action = styled(ActionIcon)`
  background-color: ${({ theme }) => (theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0])};

  &:hover {
    background-color: ${({ theme }) => (theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1])};
  }
`;

const ActionIcons = ({ size, id, type }) => {
  const theme = useMantineTheme();
  const { email } = useRecoilValue(userState);

  const now = new Date();

  const handleClick = async listName => {
    await axios.patch(`/api/users/${email}/${listName}`, { id: +id, type, modified_at: now.toISOString() });
  };

  return (
    <>
      <Group spacing={8} mr={0}>
        <Action onClick={() => handleClick('watch_list')}>
          <IconMovie size={size} color={theme.colors.yellow[7]} />
        </Action>
        <Action onClick={() => handleClick('like_list')}>
          <IconHeart size={size} color={theme.colors.red[6]} />
        </Action>
        <Action onClick={() => handleClick('history_list')}>
          <IconHistory size={size} />
        </Action>
      </Group>
    </>
  );
};

export default ActionIcons;
