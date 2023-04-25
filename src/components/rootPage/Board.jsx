import { Suspense, useState } from 'react';
import { Container } from '@mantine/core';
import Cards from './Cards';
import Category from './Category';
import { BarLoader } from '../common';

const Board = () => {
  const [mediaType, setMediaType] = useState('movie');
  const [category, setCategory] = useState([]);

  const handleMediaChange = () => {
    setMediaType(media => (media === 'movie' ? 'tv' : 'movie'));
  };

  const handleCategoryChange = newCategory => {
    setCategory(newCategory);
  };

  return (
    <Container fluid>
      <Category
        mediaType={mediaType}
        category={category}
        handleMediaChange={handleMediaChange}
        handleCategoryChange={handleCategoryChange}
      />
      <Suspense fallback={<BarLoader />}>
        <Cards mediaType={mediaType} />
      </Suspense>
    </Container>
  );
};

export default Board;
