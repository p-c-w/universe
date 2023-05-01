import { SimpleGrid, rem } from '@mantine/core';
import styled from '@emotion/styled';
import { useCallback } from 'react';
import { useSortByPopularityInfinityQuery } from '../../hooks/queries';
import useObserver from '../../hooks/useObserver';
import { ScrollObserver } from '../common';
import PosterSkeleton from './PosterSkeleton';
import Poster from './Poster';

const CardGrid = styled(SimpleGrid)`
  position: relative;
  grid-template-columns: repeat(5, 15.75rem);
  margin: 0 auto;
`;

const observeOption = { rootMargin: '50%' };

const Posters = ({ mediaType }) => {
  const { data: content, hasNextPage, fetchNextPage } = useSortByPopularityInfinityQuery(mediaType);

  const getNextPage = useCallback(() => {
    if (hasNextPage) fetchNextPage();
  }, [hasNextPage, fetchNextPage]);

  const observerRef = useObserver(getNextPage, hasNextPage, observeOption);

  const movie = mediaType === 'movie';

  return (
    <>
      <CardGrid
        cols={5}
        w={rem(1324)}
        verticalSpacing="sm"
        breakpoints={[
          { maxWidth: '100rem', cols: 5 },
          { maxWidth: '48rem', cols: 2 },
          { maxWidth: '36rem', cols: 1 },
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
