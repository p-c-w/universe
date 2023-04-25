import { Container, Title, Flex, ActionIcon } from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';
import ProviderBadges from './ProviderBadges';
import { PROVIDERS } from '../../constants';
import useUserQuery from '../../hooks/queries/useUserQuery';

const SubscriptionProviders = ({ onClick }) => {
  const { data: subscribeList } = useUserQuery('snowlover@gmail.com', { select: user => user.subscribe_list });

  const getProviderList = () => {
    const providers = subscribeList?.map(item => PROVIDERS.find(provider => provider.id === item.id));
    return providers;
  };

  const providers = getProviderList();

  return (
    <Container mt={10} p={0}>
      <Flex justify="space-between" align="center" mb={10}>
        <Title order={5} fw={400}>
          현재 구독하고 있어요
        </Title>
        <ActionIcon variant="transparent" onClick={onClick}>
          <IconSettings size="1rem" />
        </ActionIcon>
      </Flex>
      <ProviderBadges providers={providers} variant={'dot'} />
    </Container>
  );
};

export default SubscriptionProviders;
