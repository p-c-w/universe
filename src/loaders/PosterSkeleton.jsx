import { SimpleGrid, Skeleton } from '@mantine/core';
import styled from '@emotion/styled';
import { useMediaQuery } from '@mantine/hooks';
import { useRecoilValue } from 'recoil';
import { sideNavState } from '../recoil/atom';

const CardGrid = styled(SimpleGrid)`
  position: relative;
  min-width: 20rem;
  margin: var(--mantine-spacing-md) auto;
`;

const StyledSkeleton = styled(Skeleton)`
  aspect-ratio: 3/4;
  min-height: 6.25rem;
`;

const PosterSkeleton = () => {
  const isSideNavOpened = useRecoilValue(sideNavState);
  const smallScreen = useMediaQuery(`(max-width: ${isSideNavOpened ? '100rem' : '90rem'})`);

  return (
    <CardGrid
      cols={5}
      maw={smallScreen ? '100%' : '80%'}
      verticalSpacing="sm"
      breakpoints={
        isSideNavOpened
          ? [
              { maxWidth: '110rem', cols: 4 },
              { maxWidth: '80rem', cols: 3 },
              { maxWidth: '60rem', cols: 2 },
            ]
          : [
              { maxWidth: '80rem', cols: 4 },
              { maxWidth: '60rem', cols: 3 },
            ]
      }>
      {Array.from({ length: 20 }, (_, i) => (
        <StyledSkeleton key={i} radius="md" />
      ))}
    </CardGrid>
  );
};

export default PosterSkeleton;
