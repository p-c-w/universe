import { Container } from '@mantine/core';
import { GlobalShell } from '../components/common';
import { Collections, Title, MyInfo } from '../components/myPage';
import { useAuthenticationQuery } from '../hooks/queries';

const MyPage = () => {
  useAuthenticationQuery();

  return (
    <GlobalShell>
      <Container mt={16} mx="auto" size="100%" w={1240} miw={375}>
        <Title />
        <MyInfo />
        <Collections />
      </Container>
    </GlobalShell>
  );
};

export default MyPage;
