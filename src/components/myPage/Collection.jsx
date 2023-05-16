import { useRef, Suspense, useState } from 'react';
import { Accordion } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useRecoilValue } from 'recoil';
import { useCollectionQueries } from '../../hooks/queries';
import { useSelectedItem } from '../../hooks';
import { DetailModalWrapper, ModalSkeleton } from '../common';
import { CollectionItem, ConfirmModal } from '.';
import { sideNavState } from '../../recoil/atom';

const Collection = ({ collection, setIsItemSelected, setImgSrc, page }) => {
  const isNavOpened = useRecoilValue(sideNavState);

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

  const screenToClose = useSelectedItem(setSelectedItem, setIsItemSelected, selectedItem, page);

  const itemRef = useRef(null);

  const handleChange = e => {
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
