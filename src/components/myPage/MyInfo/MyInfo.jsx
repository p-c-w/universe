import { Suspense } from 'react';
import { Box, SimpleGrid, Skeleton } from '@mantine/core';
import { Statistics, CurrentSubscription, SuggestedSubscription } from '..';

const MyInfo = () => (
  <SimpleGrid cols={2} mt={32} spacing="xl" breakpoints={[{ maxWidth: '60rem', cols: 1 }]}>
    <Box>
      <Suspense fallback={<Skeleton w={500} h="100%" />}>
        <SuggestedSubscription />
      </Suspense>
      <Suspense fallback={<Skeleton w={500} h="100%" />}>
        <CurrentSubscription />
      </Suspense>
    </Box>
    <Suspense fallback={<Skeleton w={500} h="100%" />}>
      <Statistics />
    </Suspense>
  </SimpleGrid>
);

export default MyInfo;
