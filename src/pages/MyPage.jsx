import { useState } from 'react';
import styled from '@emotion/styled';
import { Title, Text, Accordion, Paper, Badge, Flex, rem, Box, Image, Button, Group, Transition } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { IconPencil } from '@tabler/icons-react';
import { ThemeButton, Badges, GlobalShell } from '../components';
import { ListButton, MyList } from '../components/myPage';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 77.5rem;
  gap: 3rem;
`;

const TopSection = styled.div`
  display: flex;
  gap: 1rem;
`;

const SubscriptionInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 38.75rem;
`;

const PredictedSubscription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const PredictedTitleSection = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const PresentSubscription = styled(Paper)``;

const PresentSubscriptionFee = styled(Accordion)`
  button {
    padding-left: 0;
  }
`;

const Statistics = styled(Carousel)`
  width: 38.75rem;
  text-align: center;
`;
const MyListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ListButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const MyListSection = styled.div`
  display: flex;
  gap: 1rem;
`;

const ContentImage = styled(Image)`
  display: ${props => (props.open ? 'block' : 'none')};
  width: 30%;
`;

const MyPage = () => {
  const [selected, setSelected] = useState(false);
  const [imgSrc, setImgSrc] = useState('');

  return (
    <GlobalShell>
      <Container>
        <Group spacing={5} align="start">
          <Title order={1}>OOO's Universe</Title>
          <Button variant="subtle" compact>
            <IconPencil size={15} />
          </Button>
        </Group>
        <TopSection>
          <SubscriptionInfo>
            <PredictedSubscription>
              <PredictedTitleSection>
                <Title order={3} align="left">
                  예상 구독료
                </Title>
                <Badges />
              </PredictedTitleSection>
              <Text fz="3.5rem">₩17,800</Text>
            </PredictedSubscription>
            <PresentSubscription>
              <PresentSubscriptionFee>
                <Accordion.Item value="₩29,800">
                  <Accordion.Control>
                    <Title order={4}>현재 나의 구독료</Title>
                    <Text size="2rem">₩29,800</Text>
                  </Accordion.Control>
                  <Accordion.Panel>구독정보</Accordion.Panel>
                </Accordion.Item>
              </PresentSubscriptionFee>
              <Flex direction="column" gap={5}>
                <Title order={5}>구독하고 있지만 보고 있지 않아요</Title>
                <Flex gap={3} wrap="wrap">
                  <Badge>Wavve</Badge>
                  <Badge>Netflix</Badge>
                </Flex>
              </Flex>
            </PresentSubscription>
          </SubscriptionInfo>
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
        </TopSection>
        <MyListContainer>
          <ListButtons className="mylist">
            <ListButton tooltip="이번달에 보고있거나 볼 컨텐츠">Watch</ListButton>
            <ListButton tooltip="좋아요한 컨텐츠">Like</ListButton>
            <ListButton tooltip="내가 본 컨텐츠">History</ListButton>
          </ListButtons>
          <MyListSection>
            <MyList setSelected={setSelected} setImgSrc={setImgSrc} />
            <Transition mounted={selected} transition="pop-top-right" duration={400} timingFunction="ease">
              {styles => <ContentImage open={selected} width={300} src={imgSrc} alt="content image" style={styles} />}
            </Transition>
          </MyListSection>
        </MyListContainer>
        <ThemeButton />
      </Container>
    </GlobalShell>
  );
};

export default MyPage;
