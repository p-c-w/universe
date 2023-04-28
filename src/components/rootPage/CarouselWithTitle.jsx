import { Container, Title } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import genres from '../../constants/genres';
import Slide from './Slide';

const CarouselWithTitle = ({ mediaType, providerIds, title, genreId, fetchFn }) => {
  const { isSuccess, data: content } = fetchFn(mediaType, providerIds, genreId);
  const isMovie = mediaType === 'movie';
  const headerTitle = title || genres[mediaType][genreId].name;

  return (
    <Container maw={'none'} p={0} py={'md'}>
      <Title fz={'md'}>{headerTitle}</Title>
      <Carousel slideSize="20%" mt={'md'} slideGap="md" loop align="start" slidesToScroll={6} dragFree>
        {isSuccess &&
          content?.map(
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
