import React from 'react';
import { Group, Text } from '@mantine/core';
import { Badges, CollectionButtons, Badge } from '../index';
import { getProvidersByIds } from '../../utils';

const AccordionLabel = ({ title, providers: providerIds }) => {
  const providers = getProvidersByIds(providerIds);

  return (
    <Group noWrap>
      {providers ? (
        <Badges providers={providers} spacing={30} />
      ) : (
        <Badge src={`./assets/logos/universeLogoWhite.svg`} size="2.2rem" />
      )}
      <div>
        <Text>{title}</Text>
        <CollectionButtons />
      </div>
    </Group>
  );
};

export default AccordionLabel;
