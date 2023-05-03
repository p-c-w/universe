import React from 'react';
import { Group, Text } from '@mantine/core';
import { Badges } from '..';
import { getProvidersByIds } from '../../utils';

const AccordionLabel = ({ title, providers: providerIds }) => {
  const providers = getProvidersByIds(providerIds);

  return (
    <Group noWrap>
      <Badges providers={providers} spacing={30} />
      <Text fz="lg" fw={700}>
        {title}
      </Text>
    </Group>
  );
};

export default AccordionLabel;
