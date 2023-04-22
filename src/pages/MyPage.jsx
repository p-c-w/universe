import styled from '@emotion/styled';
import { Title, Text, Accordion, Paper, Box, Image, Badge, Flex } from '@mantine/core';
import { ListButton, MyList, ThemeButton, Badges } from '../components';

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

const Statistics = styled.div`
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
  /* display: flex; */
`;

const MyPage = () => {
  console.log();
  return (
    <Container>
      <Title order={1}>OOO's Universe</Title>
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
        <Statistics>Statistics graph</Statistics>
      </TopSection>
      <MyListContainer>
        <ListButtons className="mylist">
          <ListButton tooltip="이번달에 보고있거나 볼 컨텐츠">Watch</ListButton>
          <ListButton tooltip="좋아요한 컨텐츠">Like</ListButton>
          <ListButton tooltip="내가 본 컨텐츠">History</ListButton>
        </ListButtons>
        <MyListSection>
          <MyList />
          <div>img</div>
        </MyListSection>
      </MyListContainer>
      <ThemeButton />
    </Container>
  );
};

export default MyPage;
