import React from 'react';
import { Text, Group, useMantineColorScheme, RingProgress, Flex } from '@mantine/core';
import { IconDeviceAnalytics } from '@tabler/icons-react';
import styled from '@emotion/styled';
import ReactApexChart from 'react-apexcharts';
import { useStatsByGenre } from '../../hooks/statistics';

const Diff = styled(Text)`
  align-items: center;
`;

const Icon = styled(IconDeviceAnalytics)`
  color: ${({ theme }) => (theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4])};
`;

const StatsByGenre = () => {
  const { data } = useStatsByGenre();

  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const genres = data.filter(({ count }) => count);

  const top3Genres = genres.sort((a, b) => b.count - a.count).slice(0, 3);

  const chartData = {
    options: {
      chart: {
        id: 'genres-bar',
        type: 'bar',
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      colors: ['#A17FFB'],
    },
    series: [{ data: top3Genres.map(({ label, count }) => ({ x: label, y: count })) }],
  };

  return (
    <>
      <Group position="apart" mt={7}>
        <Group align="flex-end" spacing="xs">
          <Text fz="lg" fw={700} align="left">
            <Text fw={900} c={dark ? 'violet.2' : 'violet.9'} span>
              {top3Genres[0]?.label}{' '}
            </Text>
            장르를 가장 많이 감상했어요.
          </Text>
        </Group>
        <Icon size="1.4rem" stroke={1.5} />
      </Group>
      <Diff c="teal" fz="sm" fw={700} display="flex">
        많이 시청한 장르 TOP3는 {top3Genres.map(({ label }) => label).join(', ')} 입니다.
      </Diff>

      <Flex>
        <Group position="center">
          <RingProgress
            size={170}
            thickness={16}
            label={<Text size="xs" align="center" px="xs" sx={{ pointerEvents: 'none' }}></Text>}
            sections={genres.map(({ label, part, count, color }) => ({
              value: part,
              color,
              tooltip: `${label} ${count}건`,
            }))}
          />
        </Group>

        <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={170} />
      </Flex>
    </>
  );
};

export default StatsByGenre;
