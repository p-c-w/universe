import React from 'react';
import { Group, Text, Avatar } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { ProviderAvatars } from '../../common';

const ItemTitle = ({ title, providers: providerIds }) => {
  const smallScreen = useMediaQuery('(max-width: 48rem)');

  return (
    <Group noWrap>
      {providerIds ? (
        <ProviderAvatars providerIds={providerIds} spacing={25} />
      ) : (
        <Avatar src={`./assets/logos/universeLogoWhite.svg`} size={35.2} alt="logo of universe" />
      )}
      <Text fz={smallScreen ? 'md' : 'lg'} fw={700} lineClamp={1}>
        {title}
      </Text>
    </Group>
  );
};

export default ItemTitle;
