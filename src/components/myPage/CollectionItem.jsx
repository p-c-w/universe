import React, { useState } from 'react';
import { Text, Accordion, Tooltip, Button, ThemeIcon, Flex, Badge } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { IconLayersLinked, IconTrash } from '@tabler/icons-react';
import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import { AccordionLabel } from './index';
import { useDeleteUserContentMutation } from '../../hooks/mutations';
import { userState, categoryState } from '../../recoil/atom';
import { ActionIcons } from '../common';

const EditButton = styled(Badge)`
  cursor: pointer;
`;

const getAddedDate = modifiedAt => modifiedAt?.match(/^([a-zA-Z0-9_.+-]+)T/)[1].replace(/-/g, ' .');

const CollectionItem = ({ item, setClicked, open }) => {
  const email = useRecoilValue(userState);
  const listName = useRecoilValue(categoryState);

  const [hovered, setHovered] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const { mutate: deleteUserContent } = useDeleteUserContentMutation();

  const handleClick = item => {
    setClicked(item);
    open();
  };

  const handleEditDate = () => {
    setEditMode(!editMode);
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
          <Flex direction="row" justify="space-between" align="center">
            <AccordionLabel {...item} />
            {hovered && (
              <ThemeIcon variant="transparent" onClick={handleTrashClick}>
                <IconTrash size={16} />
              </ThemeIcon>
            )}
            {editMode && <DatePicker />}
          </Flex>
        </Accordion.Control>
        <Accordion.Panel w="90%" ml={55} mt={-15} mb={20}>
          <Flex direction="column" align="flex-start" gap={3}>
            <Flex align="center" gap={10}>
              <Text size="sm">{getAddedDate(item?.modified_at)}에 추가함</Text>
              {listName === 'history' && (
                <EditButton size="sm" variant="outline" onClick={handleEditDate}>
                  날짜 수정
                </EditButton>
              )}
            </Flex>
            <div>
              <Tooltip label="더보기" position="bottom-end" withArrow withinPortal>
                <Button
                  m={0}
                  pl={0}
                  pb={3}
                  variant="transparent"
                  onClick={() => handleClick({ id: item?.id, type: item?.type })}
                  fz={12}
                  aria-label="more">
                  <Text>상세페이지로</Text>
                  <ThemeIcon variant="transparent">
                    <IconLayersLinked size={16} />
                  </ThemeIcon>
                </Button>
              </Tooltip>
            </div>
            <ActionIcons size={16} id={item.id} type={item.type} category={listName} />
          </Flex>
        </Accordion.Panel>
      </Accordion.Item>
    </>
  );
};

export default CollectionItem;
