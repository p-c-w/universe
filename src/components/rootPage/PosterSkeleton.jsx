import { SimpleGrid, rem, Skeleton } from '@mantine/core';
import styled from '@emotion/styled';

const CardGrid = styled(SimpleGrid)`
  position: relative;
  grid-template-columns: repeat(5, 15.75rem);
  margin: 0 auto;
`;

const PosterSkeleton = () => (
  <CardGrid cols={5} pt="md" w={rem(1324)} verticalSpacing="sm">
    {Array.from({ length: 10 }, (_, i) => (
      <Skeleton key={i} w={252} h={355} radius="md" />
    ))}
  </CardGrid>
);
export default PosterSkeleton;
