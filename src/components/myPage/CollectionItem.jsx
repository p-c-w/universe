import React, { useState, Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import { categoryState } from '../../recoil/atom';
import { Text, Accordion, Tooltip, Button, ThemeIcon, Flex } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useMediaQuery } from '@mantine/hooks';
import { IconLayersLinked, IconTrash } from '@tabler/icons-react';
import { AccordionLabel, ModifiedDate, ConfirmModal } from '.';
import { ActionIcons, DetailModal, ModalSkeleton } from '../common';

const CollectionItem = ({ item, setSelectedItem, setIsItemSelected }) => {
  const listName = useRecoilValue(categoryState);
  const [hovered, setHovered] = useState(false);

  const smallScreen = useMediaQuery('(max-width: 30rem)');
  const xsmallScreen = useMediaQuery('(max-width: 30rem)');

  const DetailClick = () => {
    modals.open({
      centered: true,
      withCloseButton: false,
      size: 950,
      padding: 0,
      m: 0,
      children: (
        <Suspense fallback={<ModalSkeleton />}>
          <DetailModal type={item.type} id={item.id} />
        </Suspense>
      ),
    });
  };

  const handleMouseEnter = () => setHovered(true);

  const handleMouseLeave = () => setHovered(false);

  const handleDeleteClick = e => {
    e.stopPropagation();

    modals.open({
      title: ' 해당 컨텐츠를 삭제하시겠습니까?',
      centered: true,
      children: <ConfirmModal id={item.id} listName={listName} />,
    });
  };

  const trashClick = e => {
    handleDeleteClick(e, { id: item?.id, listName });

    setSelectedItem(null);
    setIsItemSelected(false);
  };

  return (
    <>
      <Accordion.Item
        value={item?.title}
        key={item?.id}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <Accordion.Control px={xsmallScreen && 8}>
          <Flex direction="row" justify="space-between" align="center">
            <AccordionLabel {...item} />
            {hovered && (
              <ThemeIcon variant="transparent" onClick={trashClick}>
                <IconTrash size={xsmallScreen ? 12 : smallScreen ? 14 : 16} />
              </ThemeIcon>
            )}
          </Flex>
        </Accordion.Control>

        <Accordion.Panel w="90%" ml={xsmallScreen ? 43 : smallScreen ? 51 : 55} mt={-15} mb={20}>
          <Flex direction="column" align="flex-start" gap={3}>
            <ModifiedDate id={item?.id} date={item?.modified_at} />
            <div>
              <Tooltip label="더보기" position="bottom-end" withArrow withinPortal>
                <Button m={0} pl={0} pb={3} variant="transparent" onClick={DetailClick} fz={12} aria-label="more">
                  <Text fz={xsmallScreen ? 'xs' : 'sm'}>상세페이지로</Text>
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
