import { Box, Container, SimpleGrid, Skeleton } from '@mantine/core';
import { Suspense, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { ThemeButton, GlobalShell } from '../components/common';
import {
  Collections,
  MypageTitle,
  Statistics,
  CurrentSubscriptionInfo,
  PredictedFeeWrapper,
  BoxSkeleton,
} from '../components/myPage';
import { useAuthenticationQuery } from '../hooks/queries';
import { userState } from '../recoil/atom';

const MyPage = () => {
  const { isSuccess, data } = useAuthenticationQuery();
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    if (isSuccess) setUser(data.data);
    else setUser(null);
  }, [data, isSuccess, setUser]);

  return (
    <GlobalShell>
      <Container mt="1rem" mx="auto" size={'100%'} w={1240}>
        <Suspense fallback={<BoxSkeleton w={500} h="100%" />}>
          <MypageTitle />
        </Suspense>
        <SimpleGrid cols={2} mt={32} spacing="xl">
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
