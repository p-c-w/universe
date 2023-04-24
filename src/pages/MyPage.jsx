import { useState } from 'react';
import styled from '@emotion/styled';
import {
  Title,
  Text,
  Accordion,
  Badge,
  Flex,
  rem,
  Box,
  Image,
  Button,
  Group,
  Transition,
  ScrollArea,
  Container,
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { IconPencil } from '@tabler/icons-react';
import { ThemeButton, Badges, GlobalShell } from '../components';
import { ListButton, MyList, SubscribeBadges } from '../components/myPage';

const PresentSubscription = styled(Box)`
  background-color: var(--mantine-color-gray-1);
  border-radius: 2px;
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
const MyListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1.4rem;
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
      <Container mt="1rem" mx="auto" size={'100%'} w={1240}>
        <Group mb="1rem" spacing={5} align="start">
          <Title order={1} size={40}>
            OOO's Universe
          </Title>
          <Button variant="subtle" compact>
            <IconPencil size={15} />
          </Button>
        </Group>
        <Flex gap={10}>
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
        <MyListContainer>
          <ListButtons className="mylist">
            <ListButton tooltip="이번달에 보고있거나 볼 컨텐츠">Watch</ListButton>
            <ListButton tooltip="좋아요한 컨텐츠">Like</ListButton>
            <ListButton tooltip="내가 본 컨텐츠">History</ListButton>
          </ListButtons>
          <MyListSection>
            <ScrollArea w="100%" h={400}>
              <MyList setSelected={setSelected} setImgSrc={setImgSrc} />
            </ScrollArea>
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
