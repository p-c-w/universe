import React from 'react';
import { Group, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Badges, Badge } from '../common';

const AccordionLabel = ({ title, providers: providerIds }) => {
  const smallScreen = useMediaQuery('(max-width: 48rem)');

  return (
    <Group noWrap>
      {providerIds ? (
        <Badges providerIds={providerIds} spacing={25} />
      ) : (
        <Badge src={`./assets/logos/universeLogoWhite.svg`} size={35} />
      )}
      <Text fz={smallScreen ? 'md' : 'lg'} fw={700} lineClamp={1}>
        {title}
      </Text>
    </Group>
  );
};

export default AccordionLabel;
