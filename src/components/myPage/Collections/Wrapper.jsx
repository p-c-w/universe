import { Suspense, useState } from 'react';
import styled from '@emotion/styled';
import { Image, Transition, ScrollArea, Container, Flex, Pagination } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useRecoilValue } from 'recoil';
import { CategoryButtons, Collection, SkeletonWrapper, EmptyMessage } from '.';
import { useUserQuery } from '../../../hooks/queries';
import { categoryState } from '../../../recoil/atom';
import { usePagination } from '../../../hooks';

const MyListContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-top: 1.6rem;
`;

const PosterImage = styled(Image)`
  display: ${props => (props.open ? 'block' : 'none')};
`;

const Wrapper = () => {
  const smallScreen = useMediaQuery('(max-width: 48rem)');

  const category = useRecoilValue(categoryState);
  const [isItemSelected, setIsItemSelected] = useState(false);
  const [imgSrc, setImgSrc] = useState('');

  const { data = [] } = useUserQuery({
    select: userInfo => userInfo[`${category}_list`],
    refetchOnWindowFocus: false,
  });

  const { activePage, setActivePage, total, collection } = usePagination(data, category);

  return (
    <MyListContainer fluid p={0}>
      <CategoryButtons setIsItemSelected={setIsItemSelected} />
      <Flex gap={smallScreen ? 8 : 16}>
        <ScrollArea w="100%" h={400} miw={250}>
          <Suspense fallback={<SkeletonWrapper />}>
            {data.length === 0 ? (
              <EmptyMessage category={category} />
            ) : (
              <Collection
                collection={collection}
                setIsItemSelected={setIsItemSelected}
                setImgSrc={setImgSrc}
                page={activePage}
              />
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

export default Wrapper;
