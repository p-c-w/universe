import { Paper, Title, Flex, Group } from '@mantine/core';
import { IconDeviceAnalytics } from '@tabler/icons-react';
import styled from '@emotion/styled';
import { Suspense } from 'react';

const Icon = styled(IconDeviceAnalytics)`
  color: ${({ theme }) => (theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4])};
`;

const StatsWrapper = ({ stats }) => (
  <Paper withBorder p={40} pt="sm" radius="md" h="100%">
    <Flex direction="column" justify="center" h="100%">
      <Group align="center" position="apart">
        <Title order={3} align="left" fz={20}>
          Universe 분석
        </Title>
        <Icon size="1.4rem" stroke={1.5} />
      </Group>
      <Suspense>{stats}</Suspense>
    </Flex>
  </Paper>
);

export default StatsWrapper;
