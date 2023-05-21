import { useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Accordion, Pagination } from '@mantine/core';
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

  // 새로운 파생상태나 전역상태 말고 key로도 해결할 수 있을거 같아요.
  return (
    <>
      {collectionList.length === 0 ? (
        <EmptyMessage category={selectedCategory} />
      ) : (
        <>
          <Accordion
            // key={category + activePage}
            variant="separated"
            w="100%"
            onChange={selectItem}
            value={selectedItem}>
            {collectionList?.map(item => (
              <Item key={item.id} item={item} />
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
            size="sm"
            m="sm"
          />
        </>
      )}
    </>
  );
};

export default Collection;
