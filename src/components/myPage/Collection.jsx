import { useRef, Suspense, useState, useEffect } from 'react';
import { Accordion } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useRecoilValue } from 'recoil';
import { useCollectionQueries } from '../../hooks/queries';
import { DetailModalWrapper, ModalSkeleton } from '../common';
import { CollectionItem, ConfirmModal } from '.';
import { categoryState, sideNavOpenedState } from '../../recoil/atom';

const Collection = ({ collection, setItemSelected, setImgSrc }) => {
  const middleScreen = useMediaQuery('(max-width: 51.25rem)');

  const isNavOpened = useRecoilValue(sideNavOpenedState);
  const category = useRecoilValue(categoryState);

  const collectionQueries = useCollectionQueries(collection);
  const [detailModalOpened, { open: openDetailModal, close: closeDetailModal }] = useDisclosure(false);
  const [confirmModalOpened, { open: openComfirmModal, close: closeConfirmModal }] = useDisclosure(false);

  const [clicked, setClicked] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const allQueriesSucceeded = collectionQueries.every(result => result.isSuccess);

  const collectionList = collectionQueries.map(({ data }) => ({
    ...data,
    modified_at: collection?.filter(item => item.id === data?.id)[0]?.modified_at,
  }));

  const itemRef = useRef(null);

  useEffect(() => {
    setSelectedItem(null);
  }, [category]);

  const handleChange = e => {
    setSelectedItem(e);

    if (isNavOpened && middleScreen) {
      setItemSelected(null);
      return;
    }

    itemRef.current = e;
    setItemSelected(itemRef.current !== null);
    setImgSrc(
      itemRef.current && `https://image.tmdb.org/t/p/w300${collectionList.find(item => item.title === e)?.posterPath}`
    );
  };

  return (
    <>
      <Accordion variant="separated" w="100%" onChange={handleChange} value={selectedItem}>
        {allQueriesSucceeded &&
          collectionList?.map(item => (
            <CollectionItem
              key={item.id}
              item={item}
              setClicked={setClicked}
              openDetailModal={openDetailModal}
              openComfirmModal={openComfirmModal}
            />
          ))}
      </Accordion>
      {detailModalOpened && (
        <Suspense fallback={<ModalSkeleton />}>
          <DetailModalWrapper opened={detailModalOpened} close={closeDetailModal} id={clicked.id} type={clicked.type} />
        </Suspense>
      )}
      {confirmModalOpened && (
        <ConfirmModal
          opened={confirmModalOpened}
          close={closeConfirmModal}
          id={clicked.id}
          listName={clicked.listName}
        />
      )}
    </>
  );
};

export default Collection;
