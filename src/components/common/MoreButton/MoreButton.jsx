import { Button, Text, ThemeIcon } from '@mantine/core';
import { IconLayersLinked } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { showDetailModal } from '../../../utils';

const MoreButton = ({ id, type, pos, right, top }) => {
  const bigScreen = useMediaQuery('(max-width: 125rem )');

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
      onClick={() => {
        showDetailModal(id, type, bigScreen);
      }}>
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
