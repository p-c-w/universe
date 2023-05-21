import { useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, useAnimationOffsetEffect } from '@mantine/carousel';
import { Slide } from '.';
import { AUTO_PLAY_DELAY, SIDE_NAV_DURATION } from '../../../constants';
import { sideNavState } from '../../../recoil/atom';
import banner1 from '../../../assets/images/banner-1.svg';
import banner2 from '../../../assets/images/banner-2.svg';
import banner3 from '../../../assets/images/banner-3.svg';

const CarouselContainer = styled(Carousel)`
  & .mantine-Carousel-indicator {
    width: 0.9375rem;
    height: 0.125rem;
    transition: 'width 250ms ease';

    &[data-active] {
      width: 6.25rem;
    }
  }
`;

const data = [
  {
    url: banner1,
    title: '슬기로운 OTT 생활',
    subtitle: 'Universe와 함께해요!',
    backgroundColor: 'yellow.4',
  },
  {
    url: banner2,
    title: '현명한 구독관리',
    subtitle: '지금 바로 시작해보아요!',
    backgroundColor: 'violet.4',
  },
  {
    url: banner3,
    title: '나의 Universe',
    subtitle: '만들어 보고 싶다면',
    backgroundColor: 'blue.4',
  },
];

const Banner = () => {
  const autoplay = useRef(Autoplay({ delay: AUTO_PLAY_DELAY }));
  const currentSlide = useRef(0);
  const isOpened = useRecoilValue(sideNavState);
  const [embla, setEmbla] = useState(null);

  useAnimationOffsetEffect(embla, SIDE_NAV_DURATION);

  const handleCurrentSlide = idx => {
    currentSlide.current = idx;
  };

  return (
    <CarouselContainer
      key={isOpened ? 'open' : 'close'}
      my="md"
      withIndicators
      plugins={[autoplay.current]}
      initialSlide={currentSlide.current === 0 ? 0 : currentSlide.current === 1 ? 1 : 2}
      loop
      getEmblaApi={setEmbla}
      previousControlLabel="previous banner button"
      nextControlLabel="next banner button"
      onSlideChange={handleCurrentSlide}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}>
      {data.map(({ url, title, subtitle, backgroundColor }) => (
        <Carousel.Slide key={title} bg={backgroundColor}>
          <Slide url={url} title={title} subtitle={subtitle} />
        </Carousel.Slide>
      ))}
    </CarouselContainer>
  );
};

export default Banner;
