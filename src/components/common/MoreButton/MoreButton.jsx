import { Button, Text, ThemeIcon } from '@mantine/core';
import { IconLayersLinked } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { Suspense } from 'react';
import { DetailModal, ModalSkeleton } from '..';

const MoreButton = ({ id, type, pos, right, top }) => {
  const DetailClick = () => {
    modals.open({
      centered: true,
      withCloseButton: false,
      size: 950,
      padding: 0,
      m: 0,
      children: (
        <Suspense fallback={<ModalSkeleton />}>
          <DetailModal type={type} id={id} />
        </Suspense>
      ),
    });
  };

  return (
    <Button
      pos={pos}
      top={top}
      right={right}
      variant="transparent"
      m={0}
      p={0}
      fz={12}
      fw={400}
      title="더보기"
      aria-label="more"
      onClick={DetailClick}>
      <Text fz="sm" c="white">
        더보기
      </Text>
      <ThemeIcon variant="varient" c="white">
        <IconLayersLinked size={18} color="white" />
      </ThemeIcon>
    </Button>
  );
};

export default MoreButton;
