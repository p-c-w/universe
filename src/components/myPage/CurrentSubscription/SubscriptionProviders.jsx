import { Container, Title, Flex, ActionIcon } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconEdit } from '@tabler/icons-react';
import ProviderBadges from './ProviderBadges';

const SubscriptionProviders = ({ providers, onClick }) => {
  const smallScreen = useMediaQuery('(max-width: 48rem)');
  const xsmallScreen = useMediaQuery('(max-width: 30rem)');

  return (
    <Container mt={10} p={0}>
      <Flex justify="space-between" align="center" mb={10}>
        <Title order={5} fw={400} fz={xsmallScreen ? 12 : 16}>
          {providers?.length !== 0 ? '현재 구독하고 있어요.' : '현재 구독중인 서비스가 없습니다.'}
        </Title>
        <ActionIcon variant="transparent" align="center" onClick={onClick} size={xsmallScreen ? 'xs' : 'sm'}>
          <IconEdit />
        </ActionIcon>
      </Flex>
      <ProviderBadges providerIds={providers} variant={'dot'} size={xsmallScreen ? 'sm' : smallScreen ? 'md' : 'lg'} />
    </Container>
  );
};

export default SubscriptionProviders;
