import { Button, Text, ThemeIcon } from '@mantine/core';
import { IconLayersLinked } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { Suspense } from 'react';
import { DetailModal, ModalSkeleton } from '.';

const MoreButton = ({ id, type, pos, right, left, top, bottom }) => {
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
      bottom={bottom}
      right={right}
      left={left}
      variant="transparent"
      m={0}
      p={0}
      fz={12}
      fw={400}
      title="더보기"
      aria-label="more"
      onClick={DetailClick}>
      <Text fz="xs" fw={200} color="gray.4">
        {'더보기'}
      </Text>
      <ThemeIcon variant="transparent" color="gray">
        <IconLayersLinked size={16} color="gray" />
      </ThemeIcon>
    </Button>
  );
};

export default MoreButton;
