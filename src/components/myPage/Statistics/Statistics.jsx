import { useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import { Carousel, useAnimationOffsetEffect } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { StatsByMonthly, StatsByProvider, StatsByGenre, StatsWrapper } from '.';
import { sideNavState } from '../../../recoil/atom';
import { AUTO_PLAY_DELAY, SIDE_NAV_DURATION } from '../../../constants';

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
  const autoplay = useRef(Autoplay({ delay: AUTO_PLAY_DELAY }));
  const currentSlide = useRef(0);
  const isOpened = useRecoilValue(sideNavState);
  const [embla, setEmbla] = useState(null);

  useAnimationOffsetEffect(embla, SIDE_NAV_DURATION);

  const selectCurrentSlide = idx => {
    currentSlide.current = idx;
  };

  const statsComponents = [<StatsByProvider key={0} />, <StatsByGenre key={1} />, <StatsByMonthly key={2} />];

  return (
    <StatisticCarousel
      key={isOpened ? 'open' : 'close'}
      height="100%"
      loop
      withIndicators
      controlsOffset="xs"
      controlSize={20}
      previousControlLabel="previous slide button"
      nextControlLabel="next slide button"
      onSlideChange={selectCurrentSlide}
      initialSlide={currentSlide.current === 0 ? 0 : currentSlide.current === 1 ? 1 : 2}
      getEmblaApi={setEmbla}
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
