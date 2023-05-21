import { useState, useCallback, Suspense } from 'react';
import { ScrollObserver } from '../../common';
import { useSortByPopularityQuery, useSortByReleaseDateQuery, useWithGenreQuery } from '../../../hooks/queries';
import { CarouselWithTitle } from '.';
import { useObserver } from '../../../hooks';
import { GENRES } from '../../../constants';
import { CarouselSkeleton } from '../../../loaders';

const topTitles = ['인기작', '최신작'];

const Carousels = ({ mediaType, selectedIds }) => {
  const genreKeys = Object.keys(GENRES[mediaType]);
  const [genreIds, setGenreIds] = useState([]);

  const genreKeyIdx = genreIds.length;
  const remainGenre = genreKeyIdx <= genreKeys.length - 1;

  const getNextStep = useCallback(() => {
    setGenreIds(prevIds => [...prevIds, genreKeys[genreKeyIdx]]);
  }, [genreKeyIdx, genreKeys]);

  const observerRef = useObserver(getNextStep);

  return (
    <>
      {topTitles.map(title => (
        <Suspense key={title} fallback={<CarouselSkeleton />}>
          <CarouselWithTitle
            mediaType={mediaType}
            selectedIds={selectedIds}
            title={title}
            fetchFn={title === '인기작' ? useSortByPopularityQuery : useSortByReleaseDateQuery}
          />
        </Suspense>
      ))}
      {genreIds.map(genreId => (
        <Suspense key={genreId} fallback={<CarouselSkeleton />}>
          <CarouselWithTitle
            mediaType={mediaType}
            selectedIds={selectedIds}
            genreId={genreId}
            fetchFn={useWithGenreQuery}
          />
        </Suspense>
      ))}
      {remainGenre && <ScrollObserver loader={<CarouselSkeleton />} observer={observerRef} />}
    </>
  );
};

export default Carousels;
