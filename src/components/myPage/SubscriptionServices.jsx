import { Container, Title } from '@mantine/core';
import SubscribeBadges from './SubscribeBadges';

const SubscriptionServices = () => (
  <Container mt={10} p={0}>
    <Title order={5} mb={10} fw={400}>
      현재 구독하고 있어요
    </Title>
    <SubscribeBadges />
  </Container>
);

export default SubscriptionServices;
