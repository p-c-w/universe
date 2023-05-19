import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { IconLogout } from '@tabler/icons-react';
import { Text, ThemeIcon, useMantineColorScheme } from '@mantine/core';
import { useSignout } from '../../hooks';

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
  const signout = useSignout();
  const { colorScheme } = useMantineColorScheme();

  const dark = colorScheme === 'dark';

  const clickSignout = () => {
    signout();
    window.location.reload();
  };

  return (
    <Tab role="button" aria-label="Sign out" onClick={clickSignout}>
      <CustomLink to="/">
        <ThemeIcon variant={dark ? 'filled' : 'light'} color="gray">
          <IconLogout size="1.1rem" />
        </ThemeIcon>
        <Text color={dark ? 'gray.0' : 'gray.9'} ml={25} size="sm">
          Sign out
        </Text>
      </CustomLink>
    </Tab>
  );
};

export default Signout;
