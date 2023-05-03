import { Suspense, useState } from 'react';
import styled from '@emotion/styled';
import { Image, Transition, ScrollArea, Container, Flex, Pagination } from '@mantine/core';
import { useRecoilState } from 'recoil';
import { CollectionButton, Collection, CollectionSkeleton } from './index';
import { useUserQuery } from '../../hooks/queries';
import { COLLECTION_BUTTON, PAGE_LIMIT } from '../../constants';
import { categoryState } from '../../recoil/atom';

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
  const [category, setCategory] = useRecoilState(categoryState);

  const { isSuccess, data } = useUserQuery({
    select: userInfo => userInfo[`${category.toLowerCase()}_list`],
  });

  const [activePage, setActivePage] = useState(1);
  const offset = (activePage - 1) * PAGE_LIMIT;
  const total = isSuccess && +(data.length / 5).toFixed();
  const collection = isSuccess && data?.slice(offset, offset + PAGE_LIMIT);

  return (
    <MyListContainer fluid p={0}>
      <Flex gap="0.8rem">
        {COLLECTION_BUTTON.map(button => (
          <CollectionButton
            key={button.label}
            onClick={() => {
              setCategory(`${button.label.toLowerCase()}`);
            }}
            selected={category === `${button.label.toLowerCase()}`}
            tooltip={button.description}>
            {button.label}
          </CollectionButton>
        ))}
      </Flex>
      <Flex gap="1rem">
        <ScrollArea w="100%" h={400}>
          <Suspense fallback={<CollectionSkeleton />}>
            {isSuccess && <Collection collection={collection} setSelected={setSelected} setImgSrc={setImgSrc} />}
            <Pagination
              value={activePage}
              onChange={setActivePage}
              total={total}
              siblings={2}
              withEdges
              align="center"
              position="center"
              size="sm"
              m="sm"
            />
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
