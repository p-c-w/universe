import { Carousel } from '@mantine/carousel';
import { Card, Image, Container, Text } from '@mantine/core';
import { useState } from 'react';
import styled from '@emotion/styled';
import { MoreButton } from '../../common';
import { PLACEHOLDER_IMG_URL, TMDB_IMG_URL } from '../../../constants';

const StyledSlide = styled(Carousel.Slide)`
  aspect-ratio: 4/3;
`;

const Slide = ({ id, title, originalTitle, backdropPath, mediaType }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <StyledSlide py="lg" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <Card mw={342} p={0} radius="md" shadow="sm">
        <Image
          src={backdropPath ? `${TMDB_IMG_URL}w500${backdropPath}` : `${PLACEHOLDER_IMG_URL}500x281?text=TBD`}
          alt={`${title} poster`}
        />
        <Container h={60} m="sm" pt={5} pb="sm" px="xs" fluid>
          <Text fw={700} fz="lg" lineClamp={1}>
            {title}
          </Text>
          <Text fz="xs" lineClamp={1}>
            {originalTitle}
          </Text>
        </Container>
      </Card>
      {isHovered && <MoreButton id={id} type={mediaType} pos={'absolute'} right={'1.875rem'} top={'1.5625rem'} />}
    </StyledSlide>
  );
};

export default Slide;
