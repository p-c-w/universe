import { Suspense, useState } from 'react';
import styled from '@emotion/styled';
import { Image, Transition, ScrollArea, Container, Flex, Pagination } from '@mantine/core';
import { useRecoilState } from 'recoil';
import { CollectionCategoryButton, Collection, CollectionSkeleton, EmptyCollection } from './index';
import { useUserQuery } from '../../hooks/queries';
import { COLLECTION_BUTTON } from '../../constants';
import { categoryState } from '../../recoil/atom';
import { usePagination } from '../../hooks';

const MyListContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-top: 1.6rem;
`;

const ContentImage = styled(Image)`
  display: ${props => (props.open ? 'block' : 'none')};
  /* width: 30%; */
`;

const Collections = () => {
  const [itemSelected, setItemSelected] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  const [category, setCategory] = useRecoilState(categoryState);

  const { data = [] } = useUserQuery({
    select: userInfo => userInfo[`${category}_list`],
  });

  const { activePage, setActivePage, total, collection } = usePagination(data, category);

  const handleClick = (e, button) => {
    if (`${e.target.textContent.toLowerCase()}` === category) return;
    setCategory(`${button.label.toLowerCase()}`);
    setItemSelected(false);
  };

  return (
    <MyListContainer fluid p={0}>
      <Flex gap="0.8rem">
        {COLLECTION_BUTTON.map(button => (
          <CollectionCategoryButton
            key={button.label}
            onClick={e => handleClick(e, button)}
            selected={category === `${button.label.toLowerCase()}`}
            tooltip={button.description}>
            {button.label}
          </CollectionCategoryButton>
        ))}
      </Flex>
      <Flex gap="1rem">
        <ScrollArea w="100%" h={400} miw={250}>
          <Suspense fallback={<CollectionSkeleton />}>
            {data.length === 0 ? (
              <EmptyCollection category={category} />
            ) : (
              <Collection collection={collection} setItemSelected={setItemSelected} setImgSrc={setImgSrc} />
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
        <Transition mounted={itemSelected} transition="pop-top-right" duration={400} timingFunction="ease">
          {styles => (
            <ContentImage open={itemSelected} maw={300} miw={50} src={imgSrc} alt="content image" style={styles} />
          )}
        </Transition>
      </Flex>
    </MyListContainer>
  );
};

export default Collections;
