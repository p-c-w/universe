import { Container, Title } from '@mantine/core';
import ProviderBadges from './ProviderBadges';

const SubscriptionServices = () => (
  <Container mt={10} p={0}>
    <Title order={5} mb={10} fw={400}>
      현재 구독하고 있어요
    </Title>
    <ProviderBadges />
  </Container>
);

export default SubscriptionServices;
