import { Flex, Box, Container } from '@mantine/core';
import { ThemeButton, GlobalShell } from '../components/common';
import {
  Collections,
  MypageTitle,
  Statistics,
  CurrentSubscriptionInfo,
  PredictedSubscription,
} from '../components/myPage';

const MyPage = () => (
  <GlobalShell>
    <Container mt="1rem" mx="auto" size={'100%'} w={1240}>
      <MypageTitle />
      <Flex gap={10} mt="2rem">
        <Box w={620}>
          <PredictedSubscription />
          <CurrentSubscriptionInfo />
        </Box>
        <Statistics />
      </Flex>
      <Collections />
      <ThemeButton />
    </Container>
  </GlobalShell>
);
export default MyPage;
