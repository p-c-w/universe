import { Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import { Box, SimpleGrid, Skeleton } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { sideNavState } from '../../../recoil/atom';
import { Statistics, CurrentSubscription, SuggestedSubscription } from '..';
import { SuggestedSubscriptionSkeleton } from '../../../loaders';

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
        <Suspense fallback={<SuggestedSubscriptionSkeleton />}>
          <SuggestedSubscription />
        </Suspense>
        <Suspense fallback={<Skeleton w="100%" h={183} />}>
          <CurrentSubscription />
        </Suspense>
      </Box>
      <Statistics />
    </SimpleGrid>
  );
};

export default MyInfo;
