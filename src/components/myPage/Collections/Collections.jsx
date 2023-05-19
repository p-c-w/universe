import { Suspense, useState } from 'react';
import styled from '@emotion/styled';
import { Image, Transition, ScrollArea, Container, Flex } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { CategoryButtons, Collection, SkeletonWrapper } from '.';

const MyListContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-top: 1.6rem;
`;

const PosterImage = styled(Image)`
  display: ${props => (props.open ? 'block' : 'none')};
`;

const Collections = () => {
  const smallScreen = useMediaQuery('(max-width: 48rem)');

  const [isItemSelected, setIsItemSelected] = useState(false);
  const [imgSrc, setImgSrc] = useState('');

  return (
    <MyListContainer fluid p={0}>
      <CategoryButtons setIsItemSelected={setIsItemSelected} />
      <Flex gap={smallScreen ? 8 : 16}>
        <ScrollArea w="100%" h={400} miw={250}>
          <Suspense fallback={<SkeletonWrapper />}>
            <Collection setIsItemSelected={setIsItemSelected} setImgSrc={setImgSrc} />
          </Suspense>
        </ScrollArea>
        <Transition mounted={isItemSelected} transition="pop-top-right" duration={400} timingFunction="ease">
          {styles => (
            <PosterImage
              open={isItemSelected}
              maw={smallScreen ? 250 : 300}
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
