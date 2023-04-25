import { useState } from 'react';
import { Container } from '@mantine/core';
import Cards from './Cards';
import Category from './Category';

const Board = () => {
  const [media, setMedia] = useState('movie');

  const handleChange = state => {
    setMedia(state);
  };

  return (
    <Container fluid>
      <Category media={media} handleChange={handleChange} />
      <Cards />
    </Container>
  );
};

export default Board;
