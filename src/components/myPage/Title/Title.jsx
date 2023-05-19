import React, { Suspense } from 'react';
import { Container } from '@mantine/core';
import { TitleContent } from '.';

const Title = () => (
  <Container m={0} mb={16} p={0} spacing={5} miw={350} display="flex" gap={3.2} align="start">
    <Suspense>
      <TitleContent />
    </Suspense>
  </Container>
);

export default Title;
