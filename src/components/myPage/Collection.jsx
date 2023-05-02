import { useRef, Suspense, useState } from 'react';
import { Text, Accordion, Tooltip, Button, ThemeIcon, Flex } from '@mantine/core';
import { IconLayersLinked } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { AccordionLabel } from './index';
import { useCollectionQueries } from '../../hooks/queries';
import { DetailModalWrapper } from '../common';

const getAddedDate = modifiedAt => modifiedAt?.match(/^([a-zA-Z0-9_.+-]+)T/)[1].replace(/-/g, ' .');

const Collection = ({ collection, setSelected, setImgSrc }) => {
  const collectionQueries = useCollectionQueries(collection);
  const [opened, { open, close }] = useDisclosure(false);

  const [select, setSelect] = useState(null);

  console.log('collectionQueries: ', collectionQueries);

  const collectionList = collectionQueries.map(({ data }) => ({
    ...data,
    modified_at: collection?.filter(item => item.id === data.id)[0].modified_at,
  }));

  const itemRef = useRef(null);

  const handleClick = item => {
    setSelect(item);
    open();
  };

  const items = collectionList?.map(item => (
    <Accordion.Item value={item.title} key={item.id}>
      <Accordion.Control>
        <AccordionLabel {...item} />
      </Accordion.Control>
      <Accordion.Panel w="90%">
        <Flex>
          <Text size="sm">{getAddedDate(item.modified_at)}에 추가함</Text>
          <div>
            <Tooltip label="더보기" position="bottom-end" withArrow withinPortal>
              <Button
                p="xs"
                variant="transparent"
                pos="absolute"
                onClick={() => handleClick({ id: item.id, type: item.type })}
                fz={12}
                aria-label="more">
                {'more'}
                <ThemeIcon variant="transparent">
                  <IconLayersLinked size={16} />
                </ThemeIcon>
              </Button>
            </Tooltip>
          </div>
        </Flex>
      </Accordion.Panel>
    </Accordion.Item>
  ));

  const handleChange = e => {
    itemRef.current = e;
    setSelected(itemRef.current !== null);
    setImgSrc(
      itemRef.current && `https://image.tmdb.org/t/p/w300${collectionList.find(item => item.title === e)?.posterPath}`
    );
  };

  return (
    <>
      <Accordion chevronPosition="right" variant="separated" sx={{ width: '100%' }} onChange={handleChange}>
        {items}
      </Accordion>
      {opened && (
        <Suspense
          fallback={
            <div style={{ position: 'absolute', width: '100px', height: '200px', backgroundColor: '#fff' }}></div>
          }>
          <DetailModalWrapper opened={opened} close={close} id={select.id} type={select.type} />
        </Suspense>
      )}
    </>
  );
};

export default Collection;
