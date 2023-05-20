import { Suspense } from 'react';
import styled from '@emotion/styled';
import { Image, Transition, ScrollArea, Container, Flex } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useRecoilValue } from 'recoil';
import { CategoryButtons, Collection, SkeletonWrapper } from '.';
import { selectedItemImgState } from '../../../recoil/atom';

const MyListContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-top: 1.6rem;
  padding: 0;
`;

const PosterImage = styled(Image)`
  display: ${props => (props.open ? 'block' : 'none')};
`;

const Collections = () => {
  const smallScreen = useMediaQuery('(max-width: 48rem)');

  const selectedItemImg = useRecoilValue(selectedItemImgState);

  return (
    <MyListContainer fluid>
      <CategoryButtons />
      <Flex gap={smallScreen ? 8 : 16}>
        <ScrollArea w="100%" h={400} miw={250}>
          <Suspense fallback={<SkeletonWrapper />}>
            <Collection />
          </Suspense>
        </ScrollArea>
        <Transition mounted={selectedItemImg !== null} transition="pop-top-right" duration={400} timingFunction="ease">
          {styles => (
            <PosterImage
              open={selectedItemImg !== null}
              maw={smallScreen ? 250 : 300}
              miw={50}
              src={selectedItemImg}
              alt="content image"
              style={styles}
            />
          )}
        </Transition>
      </Flex>
    </MyListContainer>
  );
};

export default Collections;
