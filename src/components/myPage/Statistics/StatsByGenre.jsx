import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Text, Group, useMantineColorScheme, RingProgress, Flex } from '@mantine/core';
import { useStatsByGenre } from '../../../hooks/statistics';

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
        {top3Genres.length === 0 ? (
          <Text fz="lg" fw={700} align="left">
            무슨 장르를 좋아하시는지 분석해드려요
          </Text>
        ) : (
          <Text fz="lg" fw={700} align="left">
            <Text fw={900} c={dark ? 'violet.2' : 'violet.9'} fz="inherit" span>
              {top3Genres[0]?.label}{' '}
            </Text>
            장르를 가장 많이 감상했어요.
          </Text>
        )}
      </Group>
      <Text c="teal" fz="sm" fw={700} align="start">
        {top3Genres.length === 0
          ? '지금부터 컨텐츠를 감상해보세요!'
          : `많이 시청한 장르 TOP3는 ${top3Genres.map(({ label }) => label).join(', ')} 입니다.`}
      </Text>
      <Flex justify="center" align="center" gap={0}>
        <Group position="center">
          <RingProgress
            thickness={16}
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
