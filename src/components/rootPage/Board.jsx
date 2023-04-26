import { Suspense, useState } from 'react';
import { Container } from '@mantine/core';

import { BarLoader } from '../common';
import { Cards, Category, Carousels } from '.';

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
      <Container mt={'md'} maw={'none'}>
        {selectedIds.length === 0 ? (
          <Suspense fallback={<BarLoader />}>
            <Cards mediaType={mediaType} />
          </Suspense>
        ) : (
          <Suspense fallback={<BarLoader />}>
            <Carousels mediaType={mediaType} providerIds={selectedIds} />
          </Suspense>
        )}
      </Container>
    </Container>
  );
};

export default Board;
