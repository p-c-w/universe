import styled from '@emotion/styled';
import { Title } from '@mantine/core';

const Container = styled.div`
  margin: 0 auto;
  width: 77.5rem;
`;

const TopSection = styled.div`
  display: flex;
  gap: 1rem;
  div {
    width: 38.75rem;
  }
`;

const MyPage = () => {
  console.log();
  return (
    <Container>
      <Title>000's Universe</Title>
      <TopSection>
        <div className="subscribe">
          <Title>예상 구독료</Title>
          <div className="badges"></div>
          <div>
            <div>
              <h4>현재 나의 구독료</h4>
              <span>₩29,800</span>
              <button></button>
            </div>
            <div>
              <h4>구독하고 있지만 보고 있지 않아요</h4>
              <div className="no-badges"></div>
            </div>
          </div>
        </div>
        <div className="static">static graph</div>
      </TopSection>
    </Container>
  );
};

export default MyPage;
