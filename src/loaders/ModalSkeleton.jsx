import { Skeleton, Modal, Overlay } from '@mantine/core';

const ModalSkeleton = size => (
  <Modal.Root opened={true} size={size} m={0} p={0} centered zIndex="1001">
    <Modal.Overlay />
    <Modal.Content>
      <Overlay c="black" opacity={0.5} zIndex="1" />
      <Modal.Body bg="none" m={0} p={0}>
        <Skeleton width={size} height={562} />
      </Modal.Body>
    </Modal.Content>
  </Modal.Root>
);

export default ModalSkeleton;
