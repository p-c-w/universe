import { createStyles, Progress, Box, Text, Group, Paper, SimpleGrid, rem, Title, Container } from '@mantine/core';
import { IconDeviceAnalytics } from '@tabler/icons-react';
import { PROVIDER_COLOR } from '../../constants';

const mockData = {
  total: '345,765',
  data: [
    {
      label: 'Netflix',
      count: '204,001',
      part: 59,
      color: `${PROVIDER_COLOR.netflix}`,
    },
    {
      label: 'Wavve',
      count: '121,017',
      part: 35,
      color: `${PROVIDER_COLOR.wavve}`,
    },
    {
      label: 'Apple Tv+',
      count: '31,118',
      part: 3,
      color: `${PROVIDER_COLOR.appletvplus}`,
    },
    {
      label: 'Amazon prime',
      count: '204,001',
      part: 1,
      color: `${PROVIDER_COLOR.primevideo}`,
    },
    {
      label: 'Watcha',
      count: '121,017',
      part: 1,
      color: `${PROVIDER_COLOR.watcha}`,
    },
    {
      label: 'Disney+',
      count: '31,118',
      part: 1,
      color: `${PROVIDER_COLOR.disneyplus}`,
    },
  ],
};

const useStyles = createStyles(theme => ({
  progressLabel: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
    fontSize: theme.fontSizes.sm,
  },

  stat: {
    borderBottom: `${rem(3)} solid`,
    paddingBottom: rem(5),
  },

  statCount: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.3,
  },

  diff: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    display: 'flex',
    alignItems: 'center',
  },

  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
  },
}));

const StatisticByProvider = ({ total = mockData.total, data = mockData.data }) => {
  const { classes } = useStyles();

  const segments = data.map(segment => ({
    value: segment.part,
    color: segment.color,
    label: segment.part > 10 ? `${segment.part}%` : undefined,
  }));

  const descriptions = data.map(stat => (
    <Box key={stat.label} sx={{ borderBottomColor: stat.color }} className={classes.stat}>
      <Text tt="uppercase" fz="xs" c="dimmed" fw={700}>
        {stat.label}
      </Text>

      <Group position="apart" align="flex-end" spacing={0}>
        <Text fw={700} size="xs">
          {stat.count}
        </Text>
        <Text c={stat.color} fw={700} size="xs" className={classes.statCount}>
          {stat.part}%
        </Text>
      </Group>
    </Box>
  ));

  return (
    <Paper withBorder p="lg" radius="md" h="100%">
      <Box h="80%">
        <Title order={3} align="left">
          Universe 분석
        </Title>
        <Group position="apart" mt={7}>
          <Group align="flex-end" spacing="xs">
            <Text fz="lg" fw={700}>
              지금까지 전체 {total}건의 컨텐츠를 감상했어요.
            </Text>
          </Group>
          <IconDeviceAnalytics size="1.4rem" className={classes.icon} stroke={1.5} />
        </Group>
        <Text c="teal" className={classes.diff} fz="sm" fw={700}>
          Netflix를 가장 많이 사용했어요.
        </Text>

        <Progress sections={segments} size={34} classNames={{ label: classes.progressLabel }} mt="md" />
        <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'xs', cols: 1 }]} mt="md">
          {descriptions}
        </SimpleGrid>
      </Box>
    </Paper>
  );
};

export default StatisticByProvider;
