import { useState } from 'react';
import { Chip, Flex, Title, ActionIcon } from '@mantine/core';
import { IconDiscountCheck } from '@tabler/icons-react';
import PROVIDERS from '../../constants/providerIds';

const SubscriptionEditor = ({ providers, onClick }) => {
  const providersNames = providers?.map(provider => provider.provider_name);

  const [value, setValue] = useState(providersNames);

  return (
    <>
      <Flex justify="space-between" align="center" mb={10}>
        <Title order={5} fw={400}>
          구독중인 서비스를 선택해주세요.
        </Title>
        <ActionIcon variant="transparent" align="center" onClick={onClick}>
          <IconDiscountCheck size="1rem" />
        </ActionIcon>
      </Flex>
      <Chip.Group multiple value={value} onChange={setValue}>
        <Flex gap={3} wrap="wrap">
          {PROVIDERS.map(provider => (
            <Chip key={provider.id} value={provider.provider_name}>
              {provider.provider_name}
            </Chip>
          ))}
        </Flex>
      </Chip.Group>
    </>
  );
};

export default SubscriptionEditor;
