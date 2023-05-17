import { Box, Flex } from '@mantine/core';
import { forwardRef } from 'react';
import { PROVIDERS } from '../../../constants';

const Item = forwardRef(({ label, value, ...others }, ref) => {
  const badgePath = PROVIDERS[value].providerImgPath;

  return (
    <div ref={ref} {...others}>
      <Flex align="center">
        <Box mr={10}>
          <Box w={20}>
            <img src={`/${badgePath}`} alt="value" />
          </Box>
        </Box>
        <div>{label}</div>
      </Flex>
    </div>
  );
});

export default Item;
