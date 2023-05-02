import React from 'react';
import { Text, Accordion, Tooltip, Button, ThemeIcon, Flex } from '@mantine/core';
import { IconLayersLinked } from '@tabler/icons-react';
import { AccordionLabel } from './index';

const getAddedDate = modifiedAt => modifiedAt?.match(/^([a-zA-Z0-9_.+-]+)T/)[1].replace(/-/g, ' .');

const CollectionItem = ({ item, setClicked, open }) => {
  const handleClick = item => {
    setClicked(item);
    open();
  };

  return (
    <>
      <Accordion.Item value={item?.title} key={item?.id}>
        <Accordion.Control>
          <AccordionLabel {...item} />
        </Accordion.Control>
        <Accordion.Panel w="90%">
          <Flex>
            <Text size="sm">{getAddedDate(item?.modified_at)}에 추가함</Text>
            <div>
              <Tooltip label="더보기" position="bottom-end" withArrow withinPortal>
                <Button
                  p="xs"
                  variant="transparent"
                  pos="absolute"
                  onClick={() => handleClick({ id: item?.id, type: item?.type })}
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
    </>
  );
};

export default CollectionItem;
