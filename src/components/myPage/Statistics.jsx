import { useEffect } from 'react';
import styled from '@emotion/styled';
import { Carousel } from '@mantine/carousel';
import { Box, useMantineColorScheme } from '@mantine/core';
import { useSetRecoilState } from 'recoil';
import { statisticByProviderState } from '../../recoil/atom';
import { StatisticByProvider } from '.';
import useStatistics from '../../hooks/useStatistics';

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

  const setStatisticData = useSetRecoilState(statisticByProviderState);

  const newState = useStatistics();

  useEffect(() => {
    if (newState) {
      setStatisticData({ total: newState.newTotal, data: newState.newData });
    }
  }, [newState]);

  return (
    <StatisticCarousel height="100%" loop withIndicators controlsOffset="xs" controlSize={20}>
      <Carousel.Slide>
        <StatisticByProvider />
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
          1
        </Box>
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
          2
        </Box>
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
          3
        </Box>
      </Carousel.Slide>
    </StatisticCarousel>
  );
};

export default Statistics;
