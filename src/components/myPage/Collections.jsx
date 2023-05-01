import { Suspense, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Image, Transition, ScrollArea, Container, Flex } from '@mantine/core';
import { CollectionButton, Collection } from './index';
import { BarLoader } from '../common';
import { useUserQuery } from '../../hooks/queries';

const MyListContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-top: 1.6rem;
`;

const ContentImage = styled(Image)`
  display: ${props => (props.open ? 'block' : 'none')};
  width: 30%;
`;

const Collections = () => {
  const [selected, setSelected] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  const [category, setCategory] = useState('watch');

  return (
    <MyListContainer fluid p={0}>
      <Flex gap="0.8rem">
        <CollectionButton
          onClick={() => {
            setCategory('watch');
          }}
          selected={category === 'watch'}
          tooltip="이번달에 보고있거나 볼 컨텐츠">
          Watch
        </CollectionButton>
        <CollectionButton
          onClick={() => {
            setCategory('like');
          }}
          selected={category === 'like'}
          tooltip="좋아요한 컨텐츠">
          Like
        </CollectionButton>
        <CollectionButton
          onClick={() => {
            setCategory('history');
          }}
          selected={category === 'history'}
          tooltip="내가 본 컨텐츠">
          History
        </CollectionButton>
      </Flex>
      <Flex gap="1rem">
        <ScrollArea w="100%" h={400}>
          <Suspense fallback={<BarLoader />}>
            <Collection category={category} setSelected={setSelected} setImgSrc={setImgSrc} />
          </Suspense>
        </ScrollArea>
        <Transition mounted={selected} transition="pop-top-right" duration={400} timingFunction="ease">
          {styles => <ContentImage open={selected} width={300} src={imgSrc} alt="content image" style={styles} />}
        </Transition>
      </Flex>
    </MyListContainer>
  );
};

export default Collections;
