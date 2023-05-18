import { Container, Title } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import genres from '../../../constants/genres';
import Slide from '../Slide';

const CarouselWithTitle = ({ mediaType, selectedIds, title, genreId, fetchFn }) => {
  const { data: content } = fetchFn(mediaType, selectedIds, genreId);
  const isMovie = mediaType === 'movie';
  const headerTitle = title || genres[mediaType][genreId].name;

  return (
    <Container p={0} py={'md'} fluid>
      <Title fz={'md'}>{headerTitle}</Title>
      <Carousel
        miw={320}
        slideSize="16.66666%"
        slideGap="md"
        loop
        align="start"
        slidesToScroll={2}
        dragFree
        breakpoints={[
          { maxWidth: '110rem', slideSize: '20%' },
          { maxWidth: '80rem', slideSize: '25%' },
          { maxWidth: '60rem', slideSize: '33.3333%' },
          { maxWidth: '40rem', slideSize: '50%', slideGap: 'sm' },
        ]}>
        {content?.map(
          ({
            id,
            title,
            name,
            original_title: originalTitle,
            original_name: originalName,
            backdrop_path: backdropPath,
          }) => (
            <Slide
              key={id}
              id={id}
              title={isMovie ? title : name}
              originalTitle={isMovie ? originalTitle : originalName}
              name={name}
              backdropPath={backdropPath}
              mediaType={mediaType}
            />
          )
        )}
      </Carousel>
    </Container>
  );
};

export default CarouselWithTitle;
