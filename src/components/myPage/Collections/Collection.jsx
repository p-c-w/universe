import { useRef, useState } from 'react';
import { Accordion, Pagination } from '@mantine/core';
import { useRecoilValue } from 'recoil';
import { useMediaQuery } from '@mantine/hooks';
import { useCollectionQueries, useUserQuery } from '../../../hooks/queries';
import { useSelectedItem, usePagination } from '../../../hooks';
import { sideNavState, categoryState } from '../../../recoil/atom';
import { EmptyMessage, Item } from '.';

const Collection = ({ setIsItemSelected, setImgSrc, page }) => {
  const smallScreen = useMediaQuery('(max-width: 48rem)');

  const category = useRecoilValue(categoryState);
  const isNavOpened = useRecoilValue(sideNavState);

  const { userInfo = [] } = useUserQuery({
    select: userInfo => userInfo[`${category}_list`],
    refetchOnWindowFocus: false,
  });

  const { activePage, setActivePage, total, collection } = usePagination(userInfo.reverse());

  const collectionQueries = useCollectionQueries(collection, { enable: !!collection });

  const [selectedItem, setSelectedItem] = useState(null);

  const collectionList = collectionQueries.map(
    ({ data }) =>
      data !== undefined && {
        ...data,
        modified_at: collection?.filter(item => item.id === data?.id)[0]?.modified_at,
      }
  );

  const screenToClose = useSelectedItem(setSelectedItem, setIsItemSelected, selectedItem, page);

  const itemRef = useRef(null);

  const selectItem = e => {
    setSelectedItem(e);
    itemRef.current = e;
    setImgSrc(
      itemRef.current && `https://image.tmdb.org/t/p/w300${collectionList.find(item => item.title === e)?.posterPath}`
    );

    if (isNavOpened && screenToClose) {
      setIsItemSelected(null);
      return;
    }

    setIsItemSelected(itemRef.current !== null);
  };

  return (
    <>
      {collectionList.length === 0 ? (
        <EmptyMessage category={category} />
      ) : (
        <>
          <Accordion variant="separated" w="100%" onChange={selectItem} value={selectedItem}>
            {collectionList?.map(item => (
              <Item key={item.id} item={item} setSelectedItem={setSelectedItem} setIsItemSelected={setIsItemSelected} />
            ))}
          </Accordion>

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
        </>
      )}
    </>
  );
};

export default Collection;
