import { useRef } from 'react';
import { Accordion, Pagination } from '@mantine/core';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useMediaQuery } from '@mantine/hooks';
import { useCollectionQueries, useUserQuery } from '../../../hooks/queries';
import { usePagination } from '../../../hooks';
import { categoryState, selectedItemState } from '../../../recoil/atom';
import { EmptyMessage, Item } from '.';
import { TMDB_IMG_URL } from '../../../constants';

const Collection = ({ setImgSrc }) => {
  const smallScreen = useMediaQuery('(max-width: 48rem)');

  const category = useRecoilValue(categoryState);
  const [selectedItem, setSelectedItem] = useRecoilState(selectedItemState);
  const imgUrl = useRef(null);

  const { userInfo = [] } = useUserQuery({
    select: userInfo => userInfo[`${category}_list`],
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
    imgUrl.current = e && `${TMDB_IMG_URL}/w300${collectionList.find(item => item.title === e).posterPath}`;
    setImgSrc(imgUrl.current);
  };

  return (
    <>
      {collectionList.length === 0 ? (
        <EmptyMessage category={category} />
      ) : (
        <>
          <Accordion variant="separated" w="100%" onChange={selectItem} value={selectedItem}>
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
            size={smallScreen ? 'xs' : 'sm'}
            m={smallScreen ? 'xs' : 'sm'}
          />
        </>
      )}
    </>
  );
};

export default Collection;
