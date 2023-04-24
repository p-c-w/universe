import { useState } from 'react';
import styled from '@emotion/styled';
import { Image, Transition, ScrollArea, Container, Flex } from '@mantine/core';
import { CollectionButton, Collection } from './index';

const MyListContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1.4rem;
`;

const ContentImage = styled(Image)`
  display: ${props => (props.open ? 'block' : 'none')};
  width: 30%;
`;

const Collections = () => {
  const [selected, setSelected] = useState(false);
  const [imgSrc, setImgSrc] = useState('');

  return (
    <MyListContainer fluid>
      <Flex gap="0.5rem">
        <CollectionButton tooltip="이번달에 보고있거나 볼 컨텐츠">Watch</CollectionButton>
        <CollectionButton tooltip="좋아요한 컨텐츠">Like</CollectionButton>
        <CollectionButton tooltip="내가 본 컨텐츠">History</CollectionButton>
      </Flex>
      <Flex gap="1rem">
        <ScrollArea w="100%" h={400}>
          <Collection setSelected={setSelected} setImgSrc={setImgSrc} />
        </ScrollArea>
        <Transition mounted={selected} transition="pop-top-right" duration={400} timingFunction="ease">
          {styles => <ContentImage open={selected} width={300} src={imgSrc} alt="content image" style={styles} />}
        </Transition>
      </Flex>
    </MyListContainer>
  );
};

export default Collections;
