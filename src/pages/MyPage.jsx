import { Container, Flex } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { GlobalShell } from '../components/common';
import { Collections, Title, MyInfo } from '../components/myPage';
import { useAuthenticationQuery } from '../hooks/queries';

const MyPage = () => {
  useAuthenticationQuery();
  const middleScreen = useMediaQuery('(max-width: 120rem)');

  return (
    <GlobalShell>
      <Flex direction="column" justify="center" mt={middleScreen ? 32 : 60} px="lg" miw={375}>
        <Container mt={32} mx="auto" maw={middleScreen ? 1280 : '80%'} fluid>
          <Title />
          <MyInfo />
          <Collections />
        </Container>
      </Flex>
    </GlobalShell>
  );
};

export default MyPage;
