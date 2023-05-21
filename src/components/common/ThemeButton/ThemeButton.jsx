import { Avatar } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import styled from '@emotion/styled';
import useColorScheme from '../../../hooks/useColorScheme';

const IconBox = styled(Avatar)`
  cursor: pointer;

  &:hover .mantine-Avatar-placeholder {
    transition: 0.3s ease;
    background-color: ${({ theme }) => (theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.dark[4])};
    color: ${({ theme }) => (theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.yellow[4])};
  }
`;

const ThemeButton = () => {
  const [colorScheme, toggleColorScheme] = useColorScheme();
  const dark = colorScheme === 'dark';

  const changeTheme = () => toggleColorScheme();

  return (
    <IconBox
      size="md"
      color={dark ? 'yellow' : 'violet'}
      title="Toggle color scheme"
      cursor="pointer"
      onClick={changeTheme}>
      {dark ? <IconSun size="1.2rem" /> : <IconMoonStars size="1.2rem" />}
    </IconBox>
  );
};

export default ThemeButton;
