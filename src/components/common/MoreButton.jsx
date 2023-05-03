import { Button, Text, ThemeIcon } from '@mantine/core';
import { IconLayersLinked } from '@tabler/icons-react';

const MoreButton = ({ open, pos, right, left, top, bottom }) => (
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
    onClick={open}>
    <Text fz="xs" fw={200} color="gray.1">
      {'More'}
    </Text>
    <ThemeIcon variant="transparent" color="white">
      <IconLayersLinked size={16} color="white" />
    </ThemeIcon>
  </Button>
);

export default MoreButton;
