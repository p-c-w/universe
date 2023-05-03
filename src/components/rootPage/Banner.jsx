import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import { Image } from '@mantine/core';
import styled from '@emotion/styled';

const BillBoard = styled(Carousel)`
  & .mantine-Carousel-indicator {
    width: 0.9375rem;
    height: 0.125rem;
    transition: 'width 250ms ease';

    &[data-active] {
      width: 6.25rem;
    }
  }
`;

const data = ['/assets/images/temp.jpg', '/assets/images/temp.jpg', '/assets/images/temp.jpg'];

const SubContainer = () => <Image height={400} src={'../../assets/images/temp.jpg'} fit="cover" />;

const Banner = () => {
  const autoplay = useRef(Autoplay({ delay: 5000 }));
  return (
    <BillBoard
      withIndicators
      height={400}
      plugins={[autoplay.current]}
      loop
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}>
      {data.map((item, idx) => (
        <Carousel.Slide key={item + idx}>
          <SubContainer url={item} />
        </Carousel.Slide>
      ))}
    </BillBoard>
  );
};

export default Banner;
