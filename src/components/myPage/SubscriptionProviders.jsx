import { Container, Title, Flex, ActionIcon } from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';
import ProviderBadges from './ProviderBadges';

const SubscriptionProviders = ({ providers, onClick }) => (
  <Container mt={10} p={0}>
    <Flex justify="space-between" align="center" mb={10}>
      <Title order={5} fw={400}>
        {providers?.length !== 0 ? '현재 구독하고 있어요.' : '현재 구독중인 서비스가 없습니다.'}
      </Title>
      <ActionIcon variant="transparent" align="center" onClick={onClick} size="sm">
        <IconSettings />
      </ActionIcon>
    </Flex>
    <ProviderBadges providers={providers} variant={'dot'} />
  </Container>
);

export default SubscriptionProviders;
