import styled from '@emotion/styled';
import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';

const Button = styled(ActionIcon)`
  position: fixed;
  right: 1rem;
  bottom: 1rem;
`;

const ThemeButton = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <Button
      size="xl"
      variant="outline"
      color={dark ? 'yellow' : 'violet'}
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme">
      {dark ? <IconSun size="1.2rem" /> : <IconMoonStars size="1.2rem" />}
    </Button>
  );
};

export default ThemeButton;
