import { SimpleGrid, Space } from '@mantine/core';
import styled from '@emotion/styled';
import { useCallback } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { useSortByPopularityInfinityQuery } from '../../hooks/queries';
import useObserver from '../../hooks/useObserver';
import { ScrollObserver } from '../common';
import PosterSkeleton from './PosterSkeleton';
import Poster from './Poster';

const CardGrid = styled(SimpleGrid)`
  position: relative;
  margin: 0 auto;
`;

const observeOption = { rootMargin: '30%' };

const Posters = ({ mediaType }) => {
  const { data: content, hasNextPage, fetchNextPage } = useSortByPopularityInfinityQuery(mediaType);
  const smallScreen = useMediaQuery('(max-width: 100rem)');

  const getNextPage = useCallback(() => {
    if (hasNextPage) fetchNextPage();
  }, [hasNextPage, fetchNextPage]);

  const observerRef = useObserver(getNextPage, hasNextPage, observeOption);

  const movie = mediaType === 'movie';

  return (
    <>
      <CardGrid
        cols={5}
        miw={320}
        maw={smallScreen ? '100%' : '80%'}
        m="0 auto"
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
      <Space h="md" />
      <ScrollObserver loader={<PosterSkeleton />} hasNextPage={hasNextPage} observer={observerRef} />
    </>
  );
};
export default Posters;
