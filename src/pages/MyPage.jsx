import { Box, Container, SimpleGrid } from '@mantine/core';
import { Suspense } from 'react';
import { ThemeButton, GlobalShell, BarLoader } from '../components/common';
import {
  Collections,
  MypageTitle,
  Statistics,
  CurrentSubscriptionInfo,
  PredictedFeeWrapper,
} from '../components/myPage';

const MyPage = () => (
  <GlobalShell>
    <Container mt="1rem" mx="auto" size={'100%'} w={1240}>
      <Suspense fallback={<BarLoader />}>
        <MypageTitle />
      </Suspense>
      <SimpleGrid cols={2} mt={32} spacing="xl">
        <Box>
          <Suspense fallback={<BarLoader />}>
            <PredictedFeeWrapper />
            <CurrentSubscriptionInfo />
          </Suspense>
        </Box>
        <Suspense fallback={<BarLoader />}>
          <Statistics />
        </Suspense>
      </SimpleGrid>
      <Suspense fallback={<BarLoader />}>
        <Collections />
      </Suspense>
      <ThemeButton />
    </Container>
  </GlobalShell>
);
export default MyPage;
