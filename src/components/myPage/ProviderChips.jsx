import { useState } from 'react';
import { Chip, Flex } from '@mantine/core';
import PROVIDERS from '../../constants/provides';

const ServiceChips = () => {
  const [value, setValue] = useState(['Watcha', 'Wavve']);

  return (
    <Flex gap={3} wrap="wrap">
      <Chip.Group multiple value={value} onChange={setValue}>
        {PROVIDERS.map(provider => (
          <Chip key={provider.id} value={provider.provider_name}>
            {provider.provider_name}
          </Chip>
        ))}
      </Chip.Group>
    </Flex>
  );
};

export default ServiceChips;
