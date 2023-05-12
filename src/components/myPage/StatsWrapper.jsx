import { Paper, Title, Flex } from '@mantine/core';

const StatsWrapper = ({ stats }) => (
  <Paper withBorder p={40} pt="sm" radius="md" h="100%">
    <Flex direction="column" justify="center" h="100%">
      <Title order={3} align="left">
        Universe 분석
      </Title>
      {stats}
    </Flex>
  </Paper>
);

export default StatsWrapper;
