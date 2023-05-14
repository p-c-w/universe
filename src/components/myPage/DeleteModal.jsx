import React from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Text, Button } from '@mantine/core';

const DeleteModal = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication">
        <Text>정말 삭제하시겠습니까?</Text>

        <Button>아니오</Button>
        <Button>네</Button>
      </Modal>
    </>
  );
};

export default DeleteModal;
