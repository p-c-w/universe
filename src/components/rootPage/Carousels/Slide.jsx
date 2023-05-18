import { Carousel } from '@mantine/carousel';
import { Card, Image, Container, Text } from '@mantine/core';
import { useState } from 'react';
import { MoreButton } from '../../common';

const Slide = ({ id, title, originalTitle, backdropPath, mediaType }) => {
  const [isHovered, setIsHovered] = useState(false);

  const openMoreButton = () => setIsHovered(true);
  const closeMoreButton = () => setIsHovered(false);

  return (
    <>
      <Carousel.Slide py="lg" onMouseEnter={openMoreButton} onMouseLeave={closeMoreButton}>
        <Card mw={342} p={0} radius="md" shadow="sm">
          <Image
            src={
              backdropPath ? `https://image.tmdb.org/t/p/w500${backdropPath}` : 'https://placehold.co/500x281?text=TBD'
            }
          />
          <Container h={60} m="sm">
            <Text fw={800} fz="lg" lineClamp={1}>
              {title}
            </Text>
            <Text fz="xs" lineClamp={1}>
              {originalTitle}
            </Text>
          </Container>
        </Card>
        {isHovered && <MoreButton id={id} type={mediaType} pos={'absolute'} right={'1.875rem'} top={'1.5625rem'} />}
      </Carousel.Slide>
    </>
  );
};

export default Slide;
