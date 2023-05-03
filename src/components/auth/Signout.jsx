import React from 'react';
import { Link } from 'react-router-dom';
import { IconLogout } from '@tabler/icons-react';
import { Text, ThemeIcon, useMantineColorScheme } from '@mantine/core';

import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import styled from '@emotion/styled';
import userState from '../../recoil/atom/userState';

const CustomLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) => (theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.colors.gray[9])};
`;

const Tab = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  list-style: none;
  padding: 0.625rem;
  cursor: pointer;
  transition: 0.2s ease-in;
  border-radius: 0.3125rem;

  &:hover {
    background-color: ${({ theme }) => (theme.colorScheme === 'dark' ? theme.colors.gray[8] : theme.colors.gray[1])};
  }
`;

const Signout = () => {
  const setUser = useSetRecoilState(userState);
  const { colorScheme } = useMantineColorScheme();

  const dark = colorScheme === 'dark';

  const handleClick = async () => {
    await axios.get('/api/auth/signout');
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Tab role="button" aria-label="label" onClick={handleClick}>
      <CustomLink to="/">
        <ThemeIcon variant={dark ? 'filled' : 'light'} color="gray">
          <IconLogout size="1.1rem" />
        </ThemeIcon>
        <Text color={dark ? 'gray.0' : 'gray.9'} ml={25} size="sm">
          {'Sign out'}
        </Text>
      </CustomLink>
    </Tab>
  );
};

export default Signout;
