import { Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import { Box, Container, SimpleGrid, Skeleton } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { sideNavState } from '../recoil/atom';
import { GlobalShell } from '../components/common';
import {
  Collections,
  MypageTitle,
  Statistics,
  CurrentSubscriptionInfo,
  PredictedFeeWrapper,
  BoxSkeleton,
} from '../components/myPage';
import { useAuthenticationQuery } from '../hooks/queries';

const MyPage = () => {
  useAuthenticationQuery();

  const middleScreen = useMediaQuery('(max-width: 75rem)');
  const smallScreen = useMediaQuery('(max-width: 60rem)');
  const isOpened = useRecoilValue(sideNavState);

  return (
    <GlobalShell>
      <Container mt="1rem" mx="auto" size={'100%'} w={1240} miw={375}>
        <Suspense fallback={<BoxSkeleton w={500} h="100%" />}>
          <MypageTitle />
        </Suspense>
        <SimpleGrid cols={(middleScreen && isOpened) || smallScreen ? 1 : 2} mt={32} spacing="xl">
          <Box>
            <Suspense fallback={<BoxSkeleton w={500} h="100%" />}>
              <PredictedFeeWrapper />
              <CurrentSubscriptionInfo />
            </Suspense>
          </Box>
          <Suspense fallback={<Skeleton w={500} h="100%" />}>
            <Statistics />
          </Suspense>
        </SimpleGrid>
        <Suspense fallback={<BoxSkeleton w={1240} h="100%" />}>
          <Collections />
        </Suspense>
      </Container>
    </GlobalShell>
  );
};

export default MyPage;
