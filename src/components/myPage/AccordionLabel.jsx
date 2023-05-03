import React from 'react';
import { Box, Group, Text } from '@mantine/core';
import { useRecoilValue } from 'recoil';
import { Badges } from '..';
import { getProvidersByIds } from '../../utils';
import { categoryState } from '../../recoil/atom';
import { ActionIcons } from '../common';

const AccordionLabel = ({ title, id, type, providers: providerIds }) => {
  const category = useRecoilValue(categoryState);
  const providers = getProvidersByIds(providerIds);

  return (
    <Group noWrap>
      <Badges providers={providers} spacing={30} />
      <div>
        <Text fz="lg" fw={700}>
          {title}
        </Text>
        <Box mt="xs">
          <ActionIcons size={16} id={id} type={type} category={category} />
        </Box>
      </div>
    </Group>
  );
};

export default AccordionLabel;
