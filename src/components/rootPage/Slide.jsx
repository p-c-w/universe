import { Carousel } from '@mantine/carousel';
import { Card, Image, Container, Text } from '@mantine/core';

const Slide = ({ title, originalTitle, backdropPath }) => (
  <Carousel.Slide>
    <Card mw={342} p={0} radius="md">
      <Image
        src={backdropPath ? `https://image.tmdb.org/t/p/w500${backdropPath}` : 'https://placehold.co/500x281?text=TBD'}
      />
      <Container h={70} m="sm">
        <Text fw={800} fz="lg" lineClamp={1}>
          {title}
        </Text>
        <Text fz="xs" lineClamp={1}>
          {originalTitle}
        </Text>
      </Container>
    </Card>
  </Carousel.Slide>
);

export default Slide;
