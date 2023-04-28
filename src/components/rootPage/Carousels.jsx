import { useState, useCallback, Suspense } from 'react';
import { ScrollObserver } from '../common';
import { CarouselSkeleton, CarouselWithTitle } from '.';
import { useSortByPopularityQuery, useSortByReleaseDateQuery, useWithGenreQuery } from '../../hooks/queries';
import useObserver from '../../hooks/useObserver';
import genres from '../../constants/genres';

const observeOption = { rootMargin: '50%' };

const Carousels = ({ mediaType, providerIds }) => {
  const genreKeys = Object.keys(genres[mediaType]);
  const [step, setStep] = useState(0);
  const [genreIds, setGenreIds] = useState([]);

  const remainGenre = genreKeys.length !== genreIds.length;

  const getNextStep = useCallback(() => {
    setGenreIds(prevIds => [...prevIds, genreKeys[step]]);
    setStep(step => step + 1);
  }, [genreKeys, step]);

  const observerRef = useObserver(getNextStep, remainGenre, observeOption);

  const topTitles = ['인기작', '최신작'];

  return (
    <>
      {topTitles.map(title => (
        <Suspense key={title} fallback={<CarouselSkeleton />}>
          <CarouselWithTitle
            mediaType={mediaType}
            providerIds={providerIds}
            title={title}
            fetchFn={title === '최신작' ? useSortByPopularityQuery : useSortByReleaseDateQuery}
          />
        </Suspense>
      ))}
      {genreIds.length !== 0 &&
        genreIds.map(genreId => (
          <Suspense key={genreId} fallback={<CarouselSkeleton />}>
            <CarouselWithTitle
              mediaType={mediaType}
              providerIds={providerIds}
              genreId={genreId}
              fetchFn={useWithGenreQuery}
            />
          </Suspense>
        ))}
      <ScrollObserver loader={<CarouselSkeleton />} hasNextPage={remainGenre} observer={observerRef} />
    </>
  );
};

export default Carousels;
