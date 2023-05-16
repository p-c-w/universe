import React from 'react';
import { Group, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Badges, Badge } from '../common';
import { getProvidersByIds } from '../../utils';

const AccordionLabel = ({ title, providers: providerIds }) => {
  const providers = getProvidersByIds(providerIds);

  const smallScreen = useMediaQuery('(max-width: 48rem)');
  const xsmallScreen = useMediaQuery('(max-width: 30rem)');

  return (
    <Group noWrap>
      {providers ? (
        <Badges providers={providers} spacing={25} />
      ) : (
        <Badge src={`./assets/logos/universeLogoWhite.svg`} size={35} />
      )}
      <Text fz={xsmallScreen ? 'sm' : smallScreen ? 'md' : 'lg'} fw={700} lineClamp={1}>
        {title}
      </Text>
    </Group>
  );
};

export default AccordionLabel;
