import { Suspense, useState } from 'react';
import styled from '@emotion/styled';
import { Image, Transition, ScrollArea, Container, Flex, Pagination } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
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

const PosterImage = styled(Image)`
  display: ${props => (props.open ? 'block' : 'none')};
`;

const Collections = () => {
  const smallScreen = useMediaQuery('(max-width: 48rem)');

  const [isItemSelected, setIsItemSelected] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  const [category, setCategory] = useRecoilState(categoryState);

  const { data = [] } = useUserQuery({
    select: userInfo => userInfo[`${category}_list`],
  });

  const { activePage, setActivePage, total, collection } = usePagination(data, category);

  const handleClick = (e, button) => {
    if (`${e.target.textContent.toLowerCase()}` === category) return;
    setCategory(`${button.label.toLowerCase()}`);
    setIsItemSelected(false);
  };

  return (
    <MyListContainer fluid p={0}>
      <Flex gap={smallScreen ? 8 : 12}>
        {COLLECTION_BUTTON.map(button => (
          <CollectionCategoryButton
            key={button.label}
            onClick={e => handleClick(e, button)}
            selected={category === `${button.label.toLowerCase()}`}
            {...button}>
            {button.label}
          </CollectionCategoryButton>
        ))}
      </Flex>
      <Flex gap={smallScreen ? 8 : 16}>
        <ScrollArea w="100%" h={400} miw={250}>
          <Suspense fallback={<CollectionSkeleton />}>
            {data.length === 0 ? (
              <EmptyCollection category={category} />
            ) : (
              <Collection collection={collection} setItemSelected={setIsItemSelected} setImgSrc={setImgSrc} />
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
            size={smallScreen ? 'xs' : 'sm'}
            m={smallScreen ? 'xs' : 'sm'}
          />
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
