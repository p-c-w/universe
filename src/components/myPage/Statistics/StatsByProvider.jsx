import { Progress, Box, Text, Group, SimpleGrid, useMantineColorScheme } from '@mantine/core';
import styled from '@emotion/styled';
import { useStatsByProvider } from '../../../hooks/statistics';

const ProgressBar = styled(Progress)`
  .mantine-Progress-label {
    line-height: 1;
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const Stat = styled(Box)`
  border-bottom: 0.1875rem solid ${props => props.color};
`;

const getMaxProvider = datas => {
  let max = 0;
  let maxProvider = '';
  datas?.forEach(data => {
    if (+data.count >= max) {
      max = +data.count;
      maxProvider = data.label;
    }
  });
  return maxProvider;
};

const StatsByProvider = () => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const { total, data } = useStatsByProvider();

  const maxProvider = getMaxProvider(data);

  const segments = data?.map(segment => ({
    value: segment.part,
    color: dark ? segment.color[4] : segment.color[6],
    label: segment.part > 10 ? `${segment.part}%` : undefined,
    tooltip: `${`${segment.label} ${segment.part}`}%`,
  }));

  const descriptions = data?.map(stat => (
    <Stat key={stat.label} color={dark ? stat.color[4] : stat.color[6]} pb={5}>
      <Text tt="uppercase" fz="xs" c="dimmed" fw={700}>
        {stat.label}
      </Text>
      <Group position="apart" align="flex-end" spacing={0}>
        <Text fw={700} size="xs">
          {stat.count}
        </Text>
        <Text c={dark ? stat.color[4] : stat.color[6]} fw={700} size="xs" lh="1.3">
          {stat.part}%
        </Text>
      </Group>
    </Stat>
  ));

  return (
    <>
      <Group position="apart" mt={7}>
        <Text fz="lg" fw={700} align="left">
          지금까지 전체{' '}
          <Text fw={900} c={dark ? 'violet.2' : 'violet.9'} fz="inherit" span>
            {total}
          </Text>
          건의 컨텐츠를 감상했어요.
        </Text>
      </Group>
      <Text c="teal" fz="sm" fw={700} align="start">
        {total === 0 ? '지금부터 컨텐츠를 감상해보세요!' : `${maxProvider}를 가장 많이 사용했어요.`}
      </Text>
      <Text fz="xs" fw={300} align="left">
        *여러곳에서 제공되는 경우, 가장 먼저 있는 업체 정보로 계산됩니다.
      </Text>
      <ProgressBar sections={segments} size={34} mt="md" />
      <SimpleGrid cols={3} breakpoints={[{ maxWidth: '40rem', cols: 2 }]} mt="md">
        {descriptions}
      </SimpleGrid>
    </>
  );
};

export default StatsByProvider;
