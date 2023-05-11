import { useRef, Suspense, useState } from 'react';
import { Accordion } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useCollectionQueries } from '../../hooks/queries';
import { DetailModalWrapper, ModalSkeleton } from '../common';
import { CollectionItem } from '.';

const Collection = ({ collection, setItemSelected, setImgSrc }) => {
  const collectionQueries = useCollectionQueries(collection);
  const [opened, { open, close }] = useDisclosure(false);

  const [clicked, setClicked] = useState(null);

  const allQueriesSucceeded = collectionQueries.every(result => result.isSuccess);

  const collectionList = collectionQueries.map(({ data }) => ({
    ...data,
    modified_at: collection?.filter(item => item.id === data?.id)[0]?.modified_at,
  }));

  const itemRef = useRef(null);

  const handleChange = e => {
    itemRef.current = e;
    setItemSelected(itemRef.current !== null);
    setImgSrc(
      itemRef.current && `https://image.tmdb.org/t/p/w300${collectionList.find(item => item.title === e)?.posterPath}`
    );
  };

  return (
    <>
      <Accordion chevronPosition="right" variant="separated" sx={{ width: '100%' }} onChange={handleChange}>
        {allQueriesSucceeded &&
          collectionList?.map(item => <CollectionItem key={item.id} item={item} setClicked={setClicked} open={open} />)}
      </Accordion>
      {opened && (
        <Suspense fallback={<ModalSkeleton />}>
          <DetailModalWrapper opened={opened} close={close} id={clicked.id} type={clicked.type} />
        </Suspense>
      )}
    </>
  );
};

export default Collection;
