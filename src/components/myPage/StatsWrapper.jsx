import { Paper, Title, Flex } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

const StatsWrapper = ({ stats }) => {
  const xsmallScreen = useMediaQuery('(max-width: 30rem)');

  return (
    <Paper withBorder p={40} pt="sm" radius="md" h="100%">
      <Flex direction="column" justify="center" h="100%">
        <Title order={3} align="left" fz={xsmallScreen ? 18 : 22}>
          Universe 분석
        </Title>
        {stats}
      </Flex>
    </Paper>
  );
};

export default StatsWrapper;
