import { Box, Skeleton } from '@mantine/core';

const BoxSkeleton = ({ w, h }) => (
  <Box w={w} h={h} p>
    <Skeleton w={w} h={h} />
  </Box>
);

export default BoxSkeleton;
