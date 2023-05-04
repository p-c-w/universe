import { SimpleGrid, Skeleton } from '@mantine/core';
import styled from '@emotion/styled';
import { useMediaQuery } from '@mantine/hooks';

const CardGrid = styled(SimpleGrid)`
  position: relative;
  margin: 0 auto;
`;

const PosterSkeleton = () => {
  const smallScreen = useMediaQuery('(max-width: 100rem)');

  return (
    <CardGrid
      cols={5}
      miw={320}
      maw={smallScreen ? '100%' : '80%'}
      m="0 auto"
      verticalSpacing="sm"
      breakpoints={[
        { maxWidth: '80rem', cols: 4 },
        { maxWidth: '60rem', cols: 3 },
        { maxWidth: '40rem', cols: 2 },
      ]}>
      {Array.from({ length: 20 }, (_, i) => (
        <Skeleton key={i} radius="md" mih={300}>
          <img src="https://placehold.co/252x378" alt="skeleton" />
        </Skeleton>
      ))}
    </CardGrid>
  );
};

export default PosterSkeleton;
