import React from 'react';
import { Group, Text } from '@mantine/core';
import { Badges, CollectionButtons } from '../index';
import { PROVIDERS } from '../../constants';

const AccordionLabel = ({ title, providers: providerIds }) => {
  const providers = providerIds.map(providerId => PROVIDERS.find(PROVIDER => PROVIDER.id === providerId));

  return (
    <Group noWrap>
      <Badges providers={providers} spacing={30} />
      <div>
        <Text>{title}</Text>
        <CollectionButtons />
      </div>
    </Group>
  );
};

export default AccordionLabel;
