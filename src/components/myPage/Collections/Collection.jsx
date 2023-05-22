import { useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Accordion, Pagination, Group } from '@mantine/core';
import { categoryState, selectedItemState } from '../../../recoil/atom';
import { useCollectionQueries, useUserQuery } from '../../../hooks/queries';
import { usePagination } from '../../../hooks';
import { EmptyMessage, Item } from '.';
import { TMDB_IMG_URL } from '../../../constants';

const Collection = ({ setImgSrc }) => {
  const selectedCategory = useRecoilValue(categoryState);
  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState);
  const imgUrl = useRef(null);

  const { userInfo } = useUserQuery({
    select: userInfo => userInfo[`${selectedCategory}_list`],
    refetchOnWindowFocus: false,
  });

  const { activePage, setActivePage, total, collection } = usePagination(userInfo.reverse());

  const collectionQueries = useCollectionQueries(collection, { enable: !!collection });

  const collectionList = collectionQueries.map(
    ({ data }) =>
      data !== undefined && {
        ...data,
        modified_at: collection.filter(item => item.id === data.id)[0].modified_at,
      }
  );

  const selectItem = e => {
    setSelectedItem(e);
    imgUrl.current = e && `${TMDB_IMG_URL}w300${collectionList.find(item => item.title === e).posterPath}`;
    setImgSrc(imgUrl.current);
  };

  return (
    <>
      {collectionList.length === 0 ? (
        <EmptyMessage category={selectedCategory} />
      ) : (
        <>
          <Accordion variant="separated" w="100%" onChange={selectItem} value={selectedItem}>
            {collectionList?.map(item => (
              <Item key={item.id} item={item} />
            ))}
          </Accordion>
          <Pagination.Root
            total={total}
            value={activePage}
            onChange={setActivePage}
            siblings={2}
            withEdges
            align="center"
            position="center"
            size="sm"
            m="sm">
            <Group spacing={5} position="center">
              <Pagination.First aria-label="first page button" />
              <Pagination.Previous aria-label="previous page button" />
              <Pagination.Items />
              <Pagination.Next aria-label="next page button" />
              <Pagination.Last aria-label="last page button" />
            </Group>
          </Pagination.Root>
        </>
      )}
    </>
  );
};

export default Collection;
