import styled from '@emotion/styled';
import { Title, Text } from '@mantine/core';
import { ListButton, MyList, ThemeButton, Badges } from '../components';

const Container = styled.div`
  margin: 0 auto;
  width: 77.5rem;
`;

const TopSection = styled.div`
  display: flex;
  position: relative;
  top: 1.5rem;
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

const Statistics = styled.div`
  width: 38.75rem;
  text-align: center;
`;
const MyListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
  top: 1.5rem;
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
          <div>
            <div>
              <Title order={4}>현재 나의 구독료</Title>
              <span>₩29,800</span>
              <button></button>
            </div>
            <div>
              <h4>구독하고 있지만 보고 있지 않아요</h4>
              <div className="no-badges"></div>
            </div>
          </div>
        </SubscriptionInfo>
        <Statistics className="static">Statistics graph</Statistics>
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
