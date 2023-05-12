import { useEffect } from 'react';
import styled from '@emotion/styled';
import { Carousel } from '@mantine/carousel';
import { Box, useMantineColorScheme } from '@mantine/core';
import { useSetRecoilState } from 'recoil';
import { statsByProviderState, statsByMonthlyState } from '../../recoil/atom';
import { StatsByMonthly, StatsByProvider } from '.';
import { useStatsByProvider, useStatsByMonthly } from '../../hooks';

const StatisticCarousel = styled(Carousel)`
  text-align: center;
  & .mantine-Carousel-indicator {
    background-color: gray;
    width: 0.75rem;
    height: 0.25rem;
    transition: width 250ms ease;

    &[data-active] {
      width: 2.5rem;
    }
  }
`;

const Statistics = () => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const setStatisticData = useSetRecoilState(statsByProviderState);
  const setMonthlyStats = useSetRecoilState(statsByMonthlyState);

  const newState = useStatsByProvider();
  const newMonthlyStats = useStatsByMonthly();

  useEffect(() => {
    if (newState) {
      setStatisticData({ total: newState.newTotal, data: newState.newData });
    }
  }, [newState, setStatisticData]);

  useEffect(() => {
    if (newMonthlyStats) {
      setMonthlyStats(newMonthlyStats);
    }
  }, [newMonthlyStats, setMonthlyStats]);

  return (
    <StatisticCarousel height="100%" loop withIndicators controlsOffset="xs" controlSize={20}>
      <Carousel.Slide>
        <StatsByProvider />
      </Carousel.Slide>
      <Carousel.Slide>
        <StatsByMonthly />
      </Carousel.Slide>
      <Carousel.Slide>
        <Box
          sx={{
            backgroundColor: dark ? 'var(--mantine-color-dark-6)' : 'var(--mantine-color-gray-1)',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          장르별 통계
        </Box>
      </Carousel.Slide>
    </StatisticCarousel>
  );
};

export default Statistics;
