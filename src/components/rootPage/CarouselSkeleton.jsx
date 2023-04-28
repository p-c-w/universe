import { Skeleton, Container, Card } from '@mantine/core';
import { Carousel } from '@mantine/carousel';

const CarouselSkeleton = () => (
  <Container maw={'none'} p={0} py={'md'}>
    <Skeleton w={100} h={20} />
    <Carousel slideSize="20%" mt="md" slideGap="md" loop align="start" slidesToScroll={6}>
      {Array.from({ length: 10 }, (_, i) => (
        <Carousel.Slide key={i}>
          <Card mw={342} p={0} radius="md">
            <Skeleton h={252} p="0" />
          </Card>
        </Carousel.Slide>
      ))}
    </Carousel>
  </Container>
);
export default CarouselSkeleton;
