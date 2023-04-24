import { Title, Text, Flex, Box, Container, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { ThemeButton, Badges, GlobalShell } from '../components';
import { Collections, MypageTitle, Statistics, CurrentSubscriptionInfo } from '../components/myPage';

const MyPage = () => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const theme = useMantineTheme();

  return (
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
              <Text
                fz="3.5rem"
                color={dark ? theme.colors[theme.primaryColor][2] : theme.colors[theme.primaryColor][9]}
                fw={600}>
                ₩17,800
              </Text>
            </Box>
            <CurrentSubscriptionInfo />
          </Box>
          <Statistics />
        </Flex>
        <Collections />
        <ThemeButton />
      </Container>
    </GlobalShell>
  );
};
export default MyPage;
