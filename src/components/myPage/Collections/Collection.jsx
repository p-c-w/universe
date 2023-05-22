import { useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Accordion } from '@mantine/core';
import { categoryState, selectedItemState } from '../../../recoil/atom';
import { useCollectionQueries, useUserQuery } from '../../../hooks/queries';
import { usePagination } from '../../../hooks';
import { EmptyMessage, Item, PaginationGoup } from '.';
import { TMDB_IMG_URL } from '../../../constants';

const Collection = ({ setImgSrc }) => {
  const selectedCategory = useRecoilValue(categoryState);
  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState);
  const imgUrl = useRef(null);

  const { userInfo } = useUserQuery({
    select: userInfo => [...userInfo[`${selectedCategory}_list`]].reverse(),
    refetchOnWindowFocus: false,
  });

  const { activePage, setActivePage, total, collection } = usePagination(userInfo);

  const collectionQueries = useCollectionQueries(collection, { enabled: !!collection });

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
          <Accordion variant="separated" w="100%" onChange={selectItem} value={selectedItem} mb={10}>
            {collectionList?.map(item => (
              <Item key={item.id} item={item} />
            ))}
          </Accordion>
          <PaginationGoup total={total} activePage={activePage} setActivePage={setActivePage} />
        </>
      )}
    </>
  );
};

export default Collection;
