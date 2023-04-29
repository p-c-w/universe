import styled from '@emotion/styled';
import { Carousel } from '@mantine/carousel';
import { rem, Box, useMantineColorScheme } from '@mantine/core';
import { DonutChartByProvider, LineChart, StatisticByProvider } from '.';

const StatisticCarousel = styled(Carousel)`
  width: 38.75rem;
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

  return (
    <StatisticCarousel height="100%" loop withIndicators>
      <Carousel.Slide>
        <StatisticByProvider />
      </Carousel.Slide>
      <Carousel.Slide>
        <DonutChartByProvider />
        <Box
          sx={{
            backgroundColor: dark ? 'var(--mantine-color-dark-6)' : 'var(--mantine-color-gray-1)',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}></Box>
      </Carousel.Slide>
      <Carousel.Slide>
        <LineChart />
        <Box
          sx={{
            backgroundColor: dark ? 'var(--mantine-color-dark-6)' : 'var(--mantine-color-gray-1)',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}></Box>
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
