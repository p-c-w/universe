import { Title, Text, Flex, Container, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { Badges } from '../index';

const PredictedSubscription = () => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const theme = useMantineTheme();

  return (
    <Container m={0} p={0}>
      <Flex align="center" gap={20}>
        <Title order={2} size={30} align="left">
          예상 구독료
        </Title>
        <Badges size="2rem" />
      </Flex>
      <Text
        fz="3.5rem"
        color={dark ? theme.colors[theme.primaryColor][2] : theme.colors[theme.primaryColor][9]}
        fw={500}>
        ₩17,800
      </Text>
    </Container>
  );
};

export default PredictedSubscription;
