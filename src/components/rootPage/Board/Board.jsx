import { Suspense, useEffect, useState } from 'react';
import { Container } from '@mantine/core';
// Loader 폴더 만들었음 옮기기
import { PosterSkeleton } from '../Posters';
import { Posters, Carousels, CategoryPicker } from '..';
import { goToTop } from '../../../utils';

const Board = () => {
  const [mediaType, setMediaType] = useState('movie');
  const [selectedIds, setSelectedIds] = useState([]);

  const changeMediaType = () => {
    setMediaType(media => (media === 'movie' ? 'tv' : 'movie'));
  };

  const changeCategory = newCategory => {
    setSelectedIds(newCategory);
  };

  useEffect(() => {
    goToTop();
  }, [mediaType, selectedIds]);

  return (
    <Container fluid>
      <CategoryPicker mediaType={mediaType} changeMediaType={changeMediaType} changeCategory={changeCategory} />
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
