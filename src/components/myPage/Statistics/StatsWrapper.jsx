import { Paper, Title, Flex, Group } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconDeviceAnalytics } from '@tabler/icons-react';
import styled from '@emotion/styled';

const Icon = styled(IconDeviceAnalytics)`
  color: ${({ theme }) => (theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4])};
`;

const StatsWrapper = ({ stats }) => {
  const smallScreen = useMediaQuery('(max-width: 48rem)');

  return (
    <Paper withBorder p={40} pt="sm" radius="md" h="100%">
      <Flex direction="column" justify="center" h="100%">
        <Group align="center" position="apart">
          <Title order={3} align="left" fz={smallScreen ? 20 : 22}>
            Universe 분석
          </Title>
          <Icon size="1.4rem" stroke={1.5} />
        </Group>
        {stats}
      </Flex>
    </Paper>
  );
};

export default StatsWrapper;
