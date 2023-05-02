import React, { useState } from 'react';
import { Text, Accordion, Tooltip, Button, ThemeIcon, Flex } from '@mantine/core';
import { IconLayersLinked, IconTrash } from '@tabler/icons-react';
import { useRecoilValue } from 'recoil';
import { AccordionLabel } from './index';
import { useDeleteUserContentMutation } from '../../hooks/mutations';
import { userState, categoryState } from '../../recoil/atom';

const getAddedDate = modifiedAt => modifiedAt?.match(/^([a-zA-Z0-9_.+-]+)T/)[1].replace(/-/g, ' .');

const CollectionItem = ({ item, setClicked, open }) => {
  const email = useRecoilValue(userState);
  const listName = useRecoilValue(categoryState);

  const [hovered, setHovered] = useState(false);

  const { mutate: deleteUserContent } = useDeleteUserContentMutation();

  const handleClick = item => {
    setClicked(item);
    open();
  };

  const handleMouseEnter = () => setHovered(true);

  const handleMouseLeave = () => setHovered(false);

  const handleTrashClick = e => {
    e.stopPropagation();
    deleteUserContent({ email, list: `${listName}_list`, id: item.id });
  };

  return (
    <>
      <Accordion.Item
        value={item?.title}
        key={item?.id}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <Accordion.Control>
          <Flex direction={'row'} justify={'space-between'}>
            <AccordionLabel {...item} />
            {hovered && (
              <ThemeIcon mt={11} variant="transparent" onClick={handleTrashClick}>
                <IconTrash size={16} />
              </ThemeIcon>
            )}
          </Flex>
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
