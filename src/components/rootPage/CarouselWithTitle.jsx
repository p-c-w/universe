import { Container, Title } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import useWithGenreQuery from '../../hooks/queries/useWithGenreQuery';
import genres from '../../constants/genres';
import Slide from './Slide';

const CarouselWithTitle = ({ mediaType, genreId, providerIds }) => {
  const { isSuccess, data: content } = useWithGenreQuery(mediaType, genreId, providerIds);
  const movie = mediaType === 'movie';

  if (!genreId) return false;

  return (
    <Container key={genreId} maw={'none'} p={0} py={'md'}>
      <Title fz={'md'}>{genres[mediaType][genreId].name}</Title>
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
                title={movie ? title : name}
                originalTitle={movie ? originalTitle : originalName}
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
