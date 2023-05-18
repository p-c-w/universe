import { useCallback } from 'react';
import styled from '@emotion/styled';
import { SimpleGrid } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useSortByPopularityInfinityQuery } from '../../../hooks/queries';
import { Poster, PosterSkeleton } from '.';
import useObserver from '../../../hooks/useObserver';
import { ScrollObserver } from '../../common';

const CardGrid = styled(SimpleGrid)`
  position: relative;
  min-width: 20rem;
  margin: var(--mantine-spacing-md) auto;
`;

const observeOption = { rootMargin: '30%' };

const Posters = ({ mediaType }) => {
  const { content, hasNextPage, fetchNextPage } = useSortByPopularityInfinityQuery(mediaType);
  const smallScreen = useMediaQuery('(max-width: 96rem)');

  const getNextPage = useCallback(() => {
    if (hasNextPage) fetchNextPage();
  }, [hasNextPage, fetchNextPage]);

  const observerRef = useObserver(getNextPage, hasNextPage, observeOption);

  const movie = mediaType === 'movie';

  return (
    <>
      <CardGrid
        cols={5}
        maw={smallScreen ? '100%' : '80%'}
        verticalSpacing="sm"
        breakpoints={[
          { maxWidth: '80rem', cols: 4 },
          { maxWidth: '60rem', cols: 3 },
          { maxWidth: '40rem', cols: 2 },
        ]}>
        {content.map(
          ({
            id,
            title,
            name,
            original_title: originalTitle,
            original_name: originalName,
            poster_path: posterPath,
            backdrop_path: backdropPath,
            genre_ids: genreIds,
            overview,
            release_date: releaseDate,
            first_air_date: firstAirDate,
          }) => (
            <Poster
              key={id}
              id={id}
              title={movie ? title : name}
              originalTitle={movie ? originalTitle : originalName}
              posterPath={posterPath}
              backdropPath={backdropPath}
              genreIds={genreIds}
              overview={overview}
              date={movie ? releaseDate : firstAirDate}
              mediaType={mediaType}
            />
          )
        )}
      </CardGrid>
      <ScrollObserver loader={<PosterSkeleton />} hasNextPage={hasNextPage} observer={observerRef} />
    </>
  );
};
export default Posters;
