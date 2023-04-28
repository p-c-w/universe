import React from 'react';
import { Group, Text } from '@mantine/core';
import { Badges, CollectionButtons } from '../index';
import { getProvidersByIds } from '../../utils';

const AccordionLabel = ({ title, providers: providerIds }) => {
  const providers = getProvidersByIds(providerIds);

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
