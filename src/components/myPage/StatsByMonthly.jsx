import { Paper, Title, Flex } from '@mantine/core';

const StatsByMonthly = () => (
  <Paper withBorder p={40} pt="sm" radius="md" h="100%">
    <Flex direction="column" justify="center" h="100%">
      <Title order={3} align="left">
        Universe 분석
      </Title>
    </Flex>
  </Paper>
);

export default StatsByMonthly;
