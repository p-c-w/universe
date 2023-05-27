import styled from '@emotion/styled';
import { Skeleton, Container, Card, Space } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { useRecoilValue } from 'recoil';
import { sideNavState } from '../recoil/atom';

const StyledSkeleton = styled(Skeleton)`
  aspect-ratio: 4/3;
`;

const CarouselSkeleton = () => {
  const isSideNavOpened = useRecoilValue(sideNavState);

  return (
    <Container maw={'100%'} p={0} py={'md'}>
      <Skeleton w={100} h={20} />
      <Space h="md" />
      <Carousel
        slideSize="16.66666%"
        slideGap="md"
        loop
        align="start"
        previousControlLabel="previous slide button"
        nextControlLabel="next slide button"
        slidesToScroll={2}
        dragFree
        breakpoints={
          isSideNavOpened
            ? [
                { maxWidth: '120rem', slideSize: '20%' },
                { maxWidth: '100rem', slideSize: '25%' },
                { maxWidth: '80rem', slideSize: '33.3333%', slideGap: 'xs' },
                { maxWidth: '60rem', slideSize: '50%', slideGap: 'xs' },
              ]
            : [
                { maxWidth: '110rem', slideSize: '20%' },
                { maxWidth: '80rem', slideSize: '25%' },
                { maxWidth: '60rem', slideSize: '33.3333%', slideGap: 'xs' },
              ]
        }>
        {Array.from({ length: 10 }, (_, i) => (
          <Carousel.Slide key={i}>
            <Card mw={342} p={0} radius="md" mih={200}>
              <StyledSkeleton p={0} />
            </Card>
          </Carousel.Slide>
        ))}
      </Carousel>
    </Container>
  );
};
export default CarouselSkeleton;
