import styled from '@emotion/styled';
import { Carousel } from '@mantine/carousel';
import { rem, Box, useMantineColorScheme } from '@mantine/core';

const StatisticCarousel = styled(Carousel)`
  width: 38.75rem;
  text-align: center;
`;

const Statistics = () => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <StatisticCarousel
      height="100%"
      loop
      withIndicators
      styles={{
        indicator: {
          backgroundColor: 'gray',
          width: rem(12),
          height: rem(4),
          transition: 'width 250ms ease',
          '&[data-active]': {
            width: rem(40),
          },
        },
      }}>
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
