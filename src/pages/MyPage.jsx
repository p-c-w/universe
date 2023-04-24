import styled from '@emotion/styled';
import { Title, Text, Accordion, Flex, rem, Box, Container } from '@mantine/core';
import { Carousel } from '@mantine/carousel';

import { ThemeButton, Badges, GlobalShell } from '../components';
import { Collections, MypageTitle, SubscribeBadges } from '../components/myPage';

const PresentSubscription = styled(Box)`
  background-color: ${({ theme }) => (theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1])};
  border-radius: 0.5rem;
  padding: 1rem;
`;

const PresentSubscriptionFee = styled(Accordion)`
  /* border-bottom: 1px solid white; */

  button {
    padding: 0;
  }
`;

const Statistics = styled(Carousel)`
  width: 38.75rem;
  text-align: center;
`;

const MyPage = () => (
  <GlobalShell>
    <Container mt="1rem" mx="auto" size={'100%'} w={1240}>
      <MypageTitle />
      <Flex gap={10} mt="2rem">
        <Box w={620}>
          <Box>
            <Flex align="center" gap={20}>
              <Title order={2} size={30} align="left">
                예상 구독료
              </Title>
              <Badges />
            </Flex>
            <Text fz="3.5rem">₩17,800</Text>
          </Box>
          <PresentSubscription>
            <PresentSubscriptionFee styles={{ item: { borderBottom: 'none' }, label: { padding: '0' } }}>
              <Accordion.Item value="₩29,800">
                <Accordion.Control>
                  <Title order={4}>현재 나의 구독료</Title>
                  <Text size="2rem">₩29,800</Text>
                </Accordion.Control>
                <Accordion.Panel>구독정보</Accordion.Panel>
              </Accordion.Item>
            </PresentSubscriptionFee>
            <Box mt={16}>
              <Title order={5} mb={10}>
                구독하고 있지만 보고 있지 않아요
              </Title>
              <SubscribeBadges />
            </Box>
          </PresentSubscription>
        </Box>
        <Statistics
          height="100%"
          loop
          withIndicators
          styles={{
            indicator: {
              backgroundColor: 'gray',
              width: rem(12),
              height: rem(4),
              transition: 'width 250ms ease',
              '&[data-active]': {
                width: rem(40),
              },
            },
          }}>
          <Carousel.Slide>
            <Box
              sx={{
                backgroundColor: 'lightgray',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              1
            </Box>
          </Carousel.Slide>
          <Carousel.Slide>
            <Box
              sx={{
                backgroundColor: 'lightgray',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              2
            </Box>
          </Carousel.Slide>
          <Carousel.Slide>
            <Box
              sx={{
                backgroundColor: 'lightgray',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              3
            </Box>
          </Carousel.Slide>
        </Statistics>
      </Flex>
      <Collections />
      <ThemeButton />
    </Container>
  </GlobalShell>
);

export default MyPage;
