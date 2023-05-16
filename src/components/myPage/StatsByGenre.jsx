import React from 'react';
import { Text, Group, useMantineColorScheme, RingProgress, Flex } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import ReactApexChart from 'react-apexcharts';
import { useStatsByGenre } from '../../hooks/statistics';

const StatsByGenre = () => {
  const smallScreen = useMediaQuery('(max-width: 48rem)');
  const xsmallScreen = useMediaQuery('(max-width: 30rem)');

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
        <Text fz={xsmallScreen ? 'sm' : smallScreen ? 'md' : 'lg'} fw={700} align="left">
          <Text fw={900} c={dark ? 'violet.2' : 'violet.9'} fz={'inherit'} span>
            {top3Genres[0]?.label}{' '}
          </Text>
          장르를 가장 많이 감상했어요.
        </Text>
      </Group>
      <Text c="teal" fz={xsmallScreen ? 'xs' : 'sm'} fw={700} align="start">
        많이 시청한 장르 TOP3는 {top3Genres.map(({ label }) => label).join(', ')} 입니다.
      </Text>

      <Flex justify="center">
        <Group position="center">
          <RingProgress
            size={smallScreen ? 150 : 170}
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
