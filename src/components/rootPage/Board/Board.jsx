import { Suspense, useEffect, useState } from 'react';
import { Container } from '@mantine/core';
import { PosterSkeleton } from '../../../loaders';
import { Posters, Carousels, CategoryPicker } from '..';
import { goToTop } from '../../../utils';

const Board = () => {
  const [mediaType, setMediaType] = useState('movie');
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    goToTop();
  }, [mediaType, selectedIds]);

  return (
    <Container fluid>
      <CategoryPicker
        mediaType={mediaType}
        changeMediaType={() => {
          setMediaType(media => (media === 'movie' ? 'tv' : 'movie'));
        }}
        changeCategory={setSelectedIds}
      />
      <Container p={0} fluid>
        {selectedIds.length === 0 ? (
          <Suspense fallback={<PosterSkeleton />}>
            <Posters mediaType={mediaType} />
          </Suspense>
        ) : (
          <Carousels mediaType={mediaType} selectedIds={selectedIds} />
        )}
      </Container>
    </Container>
  );
};

export default Board;
