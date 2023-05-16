import { useRef } from 'react';
import styled from '@emotion/styled';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import { StatsByMonthly, StatsByProvider, StatcsByGenre, StatsWrapper } from '.';

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
  const autoplay = useRef(Autoplay({ delay: 5000 }));
  const statsComponents = [<StatsByProvider key={0} />, <StatcsByGenre key={1} />, <StatsByMonthly key={2} />];

  return (
    <StatisticCarousel
      height="100%"
      loop
      withIndicators
      controlsOffset="xs"
      controlSize={20}
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}>
      {statsComponents.map((component, i) => (
        <Carousel.Slide key={i}>
          <StatsWrapper stats={component} />
        </Carousel.Slide>
      ))}
    </StatisticCarousel>
  );
};

export default Statistics;
