import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import { rem } from '@mantine/core';
import styled from '@emotion/styled';

const data = [
  '/assets/images/temp.jpg',
  '/assets/images/temp.jpg',
  '/assets/images/temp.jpg',
  '/assets/images/temp.jpg',
  '/assets/images/temp.jpg',
];

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${({ url }) => url});
  background-size: cover;
`;

const Card = ({ url }) => <Container url={url}></Container>;

const Banner = () => {
  const autoplay = useRef(Autoplay({ delay: 5000 }));
  return (
    <Carousel
      maw={'100%'}
      mx="auto"
      mb={'md'}
      withIndicators
      height={rem(400)}
      plugins={[autoplay.current]}
      loop
      styles={{
        indicator: {
          width: rem(12),
          height: rem(4),
          transition: 'width 250ms ease',

          '&[data-active]': {
            width: rem(40),
          },
        },
      }}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}>
      {data.map((item, idx) => (
        <Carousel.Slide key={item + idx}>
          <Card url={item} />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

export default Banner;
