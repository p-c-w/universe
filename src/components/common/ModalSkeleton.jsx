import React from 'react';
import { Modal } from '@mantine/core';

const ModalSkeleton = () => (
  <Modal.Root opened={true} size={1000} centered zIndex="9999">
    <Modal.Overlay />
  </Modal.Root>
);

export default ModalSkeleton;
