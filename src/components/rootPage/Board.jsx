import { Suspense, useState } from 'react';
import { Container } from '@mantine/core';

import { Category, Posters, Carousels, PosterSkeleton, CarouselSkeleton } from '.';

const Board = () => {
  const [mediaType, setMediaType] = useState('movie');
  const [selectedIds, setSelectedIds] = useState([]);

  const handleMediaChange = () => {
    setMediaType(media => (media === 'movie' ? 'tv' : 'movie'));
  };

  const handleCategoryChange = newCategory => {
    setSelectedIds(newCategory);
  };

  return (
    <Container fluid>
      <Category
        mediaType={mediaType}
        handleMediaChange={handleMediaChange}
        handleCategoryChange={handleCategoryChange}
      />
      <Container p={0} mt={'md'} maw={'none'}>
        {selectedIds.length === 0 ? (
          <Suspense fallback={<PosterSkeleton />}>
            <Posters mediaType={mediaType} />
          </Suspense>
        ) : (
          <Suspense fallback={<CarouselSkeleton />}>
            <Carousels mediaType={mediaType} providerIds={selectedIds} />
            <CarouselSkeleton />
          </Suspense>
        )}
      </Container>
    </Container>
  );
};

export default Board;
