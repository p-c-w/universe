import styled from '@emotion/styled';
import { Loader, useMantineColorScheme, useMantineTheme } from '@mantine/core';

const Conatiner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BarLoader = () => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <Conatiner>
      <Loader color={dark ? theme.colors.gray[0] : theme.colors.dark[8]} size="lg" variant="bars" />
    </Conatiner>
  );
};

export default BarLoader;
