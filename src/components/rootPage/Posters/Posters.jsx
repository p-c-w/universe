import { useCallback } from 'react';
import styled from '@emotion/styled';
import { SimpleGrid } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useSortByPopularityInfinityQuery } from '../../../hooks/queries';
import { Poster } from '.';
import { PosterSkeleton } from '../../../loaders';
import { useObserver } from '../../../hooks';
import { ScrollObserver } from '../../common';

const CardGrid = styled(SimpleGrid)`
  position: relative;
  min-width: 20rem;
  margin: var(--mantine-spacing-md) auto;
`;

const Posters = ({ mediaType }) => {
  const { content, hasNextPage, fetchNextPage } = useSortByPopularityInfinityQuery(mediaType);
  const smallScreen = useMediaQuery('(max-width: 96rem)');

  const movie = mediaType === 'movie';

  const getNextPage = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const observerRef = useObserver(getNextPage);

  return (
    <>
      <CardGrid
        cols={5}
        maw={smallScreen ? '100%' : '80%'}
        verticalSpacing="sm"
        breakpoints={[
          { maxWidth: '80rem', cols: 4 },
          { maxWidth: '60rem', cols: 3 },
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
      {hasNextPage && <ScrollObserver loader={<PosterSkeleton />} observer={observerRef} />}
    </>
  );
};
export default Posters;
