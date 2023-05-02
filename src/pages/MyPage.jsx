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
