import React from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Button, Group } from '@mantine/core';
import DetailModal from './DetailModal';

const DetailButton = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <DetailModal opened={opened} close={close} />
      <Group position="center">
        <Button onClick={open}>Open modal</Button>
      </Group>
    </>
  );
};

export default DetailButton;
