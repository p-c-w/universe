import { useState, useCallback } from 'react';
import { Carousel } from '@mantine/carousel';
import { Container, Title } from '@mantine/core';
import { ScrollObserver } from '../common';
import useSortByPopularityQuery from '../../hooks/queries/useSortByPopularityQuery';
import useSortByReleaseDateQuery from '../../hooks/queries/useSortByReleaseDateQuery';
import { CarouselSkeleton, Slide } from '.';
import useObsever from '../../hooks/useObsever';
import genres from '../../constants/genres';
import CarouselWithTitle from './CarouselWithTitle';

const observeOption = { rootMargin: '50%' };

const Carousels = ({ mediaType, providerIds }) => {
  const genreKeys = Object.keys(genres[mediaType]);
  const [step, setStep] = useState(0);
  const [genreIds, setGenreIds] = useState([]);
  const { isSuccess: popular, data: popularContent } = useSortByPopularityQuery(mediaType, providerIds);
  const { isSuccess: recent, data: recentContent } = useSortByReleaseDateQuery(mediaType, providerIds);

  const remainGenre = genreKeys.length !== genreIds.length;

  const getNextStep = useCallback(() => {
    setGenreIds(prevIds => [...prevIds, genreKeys[step]]);
    setStep(step => step + 1);
  }, [genreKeys, step]);

  const observerRef = useObsever(getNextStep, observeOption);

  const isMovie = mediaType === 'movie';

  return (
    <>
      <Container maw={'none'} p={0} py={'md'}>
        <Title fz={'md'}>{'인기작품'}</Title>
        <Carousel slideSize="20%" mt="md" slideGap="md" loop align="start" slidesToScroll={6} dragFree>
          {popular &&
            popularContent?.map(
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
      <Container maw={'none'} p={0} py={'md'}>
        <Title fz={'md'}>{'최신작'}</Title>
        <Carousel slideSize="20%" mt={'md'} slideGap="md" loop align="start" slidesToScroll={6} dragFree>
          {recent &&
            recentContent?.map(
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
      {genreIds.map(genreId => (
        <CarouselWithTitle key={genreId} mediaType={mediaType} genreId={genreId} providerIds={providerIds} />
      ))}
      {remainGenre && <ScrollObserver skeleton={<CarouselSkeleton />} observer={observerRef} />}
    </>
  );
};

export default Carousels;
