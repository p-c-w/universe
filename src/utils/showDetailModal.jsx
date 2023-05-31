import { Suspense } from 'react';
import { modals } from '@mantine/modals';
import { ModalSkeleton } from '../loaders';
import { DetailModal } from '../components/common';

const showDetailModal = (id, type, bigScreen) => {
  modals.open({
    centered: true,
    withCloseButton: false,
    zIndex: 99999,
    size: bigScreen ? 1000 : 1500,
    padding: 0,
    m: 0,
    children: (
      <Suspense fallback={<ModalSkeleton size={bigScreen ? 1000 : 1500} />}>
        <DetailModal type={type} id={id} />
      </Suspense>
    ),
  });
};

export default showDetailModal;
