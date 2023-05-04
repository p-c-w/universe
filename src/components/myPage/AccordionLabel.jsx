import React from 'react';
import { Group, Text } from '@mantine/core';
import { Badges, Badge } from '../common';
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
      <Text fz="lg" fw={700}>
        {title}
      </Text>
    </Group>
  );
};

export default AccordionLabel;
