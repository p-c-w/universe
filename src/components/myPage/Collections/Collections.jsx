import { Suspense, useState } from 'react';
import styled from '@emotion/styled';
import { Image, Transition, ScrollArea, Container, Flex } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useRecoilValue } from 'recoil';
import { CategoryButtons, Collection } from '.';
import { CollectionSkeleton } from '../../../loaders';
import posterImgState from '../../../recoil/selector/posterImgState';

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
  const middleScreen = useMediaQuery('(max-width: 60rem)');
  const screenToClose = useMediaQuery('(max-width: 51.25rem)');

  const isImgOpened = useRecoilValue(posterImgState(screenToClose));

  const [imgSrc, setImgSrc] = useState(null);

  return (
    <MyListContainer fluid>
      <CategoryButtons />
      <Flex gap={middleScreen ? 8 : 16}>
        <ScrollArea w="100%" h={460} miw={250}>
          <Suspense fallback={<CollectionSkeleton />}>
            <Collection setImgSrc={setImgSrc} />
          </Suspense>
        </ScrollArea>
        <Transition mounted={isImgOpened} transition="pop-top-right" duration={400} timingFunction="ease">
          {styles => (
            <PosterImage
              open={isImgOpened}
              maw={middleScreen ? 250 : 300}
              miw={50}
              src={imgSrc}
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
