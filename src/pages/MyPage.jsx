import { Suspense } from 'react';
import { Box, Container, SimpleGrid, Skeleton } from '@mantine/core';
import { GlobalShell } from '../components/common';
import { Collections, MypageTitle, Statistics, CurrentSubscription, SuggestedSubscription } from '../components/myPage';
import { useAuthenticationQuery } from '../hooks/queries';

const MyPage = () => {
  useAuthenticationQuery();

  return (
    <GlobalShell>
      <Container mt="1rem" mx="auto" size={'100%'} w={1240} miw={375}>
        <Suspense fallback={<Skeleton w={500} h="100%" />}>
          <MypageTitle />
        </Suspense>
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
        <Suspense fallback={<Skeleton w={1240} h="100%" />}>
          <Collections />
        </Suspense>
      </Container>
    </GlobalShell>
  );
};

export default MyPage;
