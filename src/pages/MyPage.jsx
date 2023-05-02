import { Box, Container, SimpleGrid } from '@mantine/core';
import { Suspense, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { ThemeButton, GlobalShell, BarLoader } from '../components/common';
import {
  Collections,
  MypageTitle,
  Statistics,
  CurrentSubscriptionInfo,
  PredictedFeeWrapper,
} from '../components/myPage';
import { useAuthenticationQuery } from '../hooks/queries';
import { isLoginState } from '../recoil/atom';

const MyPage = () => {
  const { isSuccess } = useAuthenticationQuery();

  const setIsLogin = useSetRecoilState(isLoginState);

  useEffect(() => {
    if (isSuccess) setIsLogin(true);
  }, [isSuccess, setIsLogin]);

  return (
    <GlobalShell>
      <Container mt="1rem" mx="auto" size={'100%'} w={1240}>
        <Suspense fallback={<BarLoader />}>
          <MypageTitle />
        </Suspense>
        <SimpleGrid cols={2} mt={32} spacing="xl">
          <Box>
            <Suspense fallback={<BarLoader />}>
              <PredictedFeeWrapper />
            </Suspense>
            <Suspense fallback={<BarLoader />}>
              <CurrentSubscriptionInfo />
            </Suspense>
          </Box>
          <Statistics />
        </SimpleGrid>
        <Suspense fallback={<BarLoader />}>
          <Collections />
        </Suspense>
        <ThemeButton />
      </Container>
    </GlobalShell>
  );
};

export default MyPage;
