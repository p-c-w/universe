import { Suspense, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Image, Transition, ScrollArea, Container, Flex, Pagination } from '@mantine/core';
import { useRecoilState } from 'recoil';
import { CollectionCategoryButton, Collection, CollectionSkeleton, EmptyCollection } from './index';
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

  const { data = [] } = useUserQuery({
    select: userInfo => userInfo[`${category}_list`],
  });

  const [activePage, setActivePage] = useState(1);
  const offset = (activePage - 1) * PAGE_LIMIT;
  const total = Math.ceil(data.length / 5);
  const collection = data.slice(offset, offset + PAGE_LIMIT);

  useEffect(() => {
    setActivePage(1);
  }, [category]);

  return (
    <MyListContainer fluid p={0}>
      <Flex gap="0.8rem">
        {COLLECTION_BUTTON.map(button => (
          <CollectionCategoryButton
            key={button.label}
            onClick={() => {
              setCategory(`${button.label.toLowerCase()}`);
            }}
            selected={category === `${button.label.toLowerCase()}`}
            tooltip={button.description}>
            {button.label}
          </CollectionCategoryButton>
        ))}
      </Flex>
      <Flex gap="1rem">
        <ScrollArea w="100%" h={400}>
          <Suspense fallback={<CollectionSkeleton />}>
            {data.length === 0 ? (
              <EmptyCollection category={category} />
            ) : (
              <Collection collection={collection} setSelected={setSelected} setImgSrc={setImgSrc} />
            )}
          </Suspense>
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
        </ScrollArea>
        <Transition mounted={selected} transition="pop-top-right" duration={400} timingFunction="ease">
          {styles => <ContentImage open={selected} width={300} src={imgSrc} alt="content image" style={styles} />}
        </Transition>
      </Flex>
    </MyListContainer>
  );
};

export default Collections;
