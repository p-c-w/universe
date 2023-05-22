import { Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import { Box, SimpleGrid, Skeleton } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { sideNavState } from '../../../recoil/atom';
import { Statistics, CurrentSubscription, SuggestedSubscription } from '..';

const MyInfo = () => {
  const largeScreen = useMediaQuery('(max-width: 75rem)');
  const middleScreen = useMediaQuery('(max-width: 60rem)');
  const isOpened = useRecoilValue(sideNavState);

  return (
    <SimpleGrid
      cols={middleScreen || (largeScreen && isOpened) ? 1 : 2}
      mt={32}
      spacing="xl"
      breakpoints={[{ maxWidth: '60rem', cols: 1 }]}>
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
};

export default MyInfo;
