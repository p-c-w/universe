import { useRef, useState, useEffect } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import { Button, Container, Flex, Image, Space, Title } from '@mantine/core';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import banner1 from '../../assets/images/banner-1.svg';
import banner2 from '../../assets/images/banner-2.svg';
import banner3 from '../../assets/images/banner-3.svg';
import { sideNavOpenedState } from '../../recoil/atom';

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

const SubContainer = ({ url, title, subtitle }) => (
  <Flex h={'100%'} m={0} p={50} justify="center" align="center">
    <Container m={0}>
      <Title order={1} c={'black'}>
        {title}
      </Title>
      <Space h={10} />
      <Title order={2} fw={400} c={'black'}>
        {subtitle}
      </Title>
      <Space h={50} />
      <Button w={280} h={50} component={Link} to={'/signin'} fz="lg">
        Get Started!
      </Button>
    </Container>
    <Space w={100} />
    <Image maw={500} h="100%" src={url} fit="contain"></Image>
  </Flex>
);

const Banner = () => {
  const autoplay = useRef(Autoplay({ delay: 5000 }));
  const [remountKey, setRemountKey] = useState(0);
  const sideNavState = useRecoilValue(sideNavOpenedState);

  useEffect(() => {
    setTimeout(() => setRemountKey(prev => prev + 1), 410);
  }, [sideNavState]);

  return (
    <BillBoard
      key={remountKey}
      withIndicators
      plugins={[autoplay.current]}
      loop
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}>
      {data.map(({ url, title, subtitle, backgroundColor }) => (
        <Carousel.Slide key={title} bg={backgroundColor} size="100%">
          <SubContainer url={url} title={title} subtitle={subtitle} />
        </Carousel.Slide>
      ))}
    </BillBoard>
  );
};

export default Banner;
