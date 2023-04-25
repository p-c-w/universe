import { Suspense, useState } from 'react';
import { Container, Loader } from '@mantine/core';
import Cards from './Cards';
import Category from './Category';

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
      <Suspense fallback={<Loader color="grape" size="lg" variant="bars" />}>
        <Cards mediaType={mediaType} />
      </Suspense>
    </Container>
  );
};

export default Board;
