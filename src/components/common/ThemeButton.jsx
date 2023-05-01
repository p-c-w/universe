import { Avatar } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import styled from '@emotion/styled';
import useColorScheme from '../../hooks/useColorScheme';

const IconBox = styled(Avatar)`
  cursor: pointer;
`;

const ThemeButton = () => {
  const [colorScheme, toggleColorScheme] = useColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <IconBox
      size="md"
      mx="xs"
      color={dark ? 'yellow' : 'violet'}
      title="Toggle color scheme"
      cursor="pointer"
      onClick={() => toggleColorScheme()}>
      {dark ? <IconSun size="1.2rem" /> : <IconMoonStars size="1.2rem" />}
    </IconBox>
  );
};

export default ThemeButton;
