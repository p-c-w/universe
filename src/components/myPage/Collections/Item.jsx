import { Suspense, useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { IconLayersLinked, IconTrash } from '@tabler/icons-react';
import { Text, Accordion, Tooltip, Button, ThemeIcon, Flex } from '@mantine/core';
import { modals } from '@mantine/modals';
import { categoryState, selectedItemState } from '../../../recoil/atom';
import { ItemTitle, DateEditor, ConfirmModal } from '.';
import { ActionIcons, DetailModal, ModalSkeleton } from '../../common';

const Item = ({ item }) => {
  const iconTrashRef = useRef(null);
  const selectedCategory = useRecoilValue(categoryState);
  const setSelectedItem = useSetRecoilState(selectedItemState);

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

  // 핸들러 함수 이름 변경하기

  const handleMouseEnter = () => {
    iconTrashRef.current.style.opacity = 1;
  };

  const handleMouseLeave = () => {
    iconTrashRef.current.style.opacity = 0;
  };

  const handleDeleteClick = e => {
    e.stopPropagation();

    modals.open({
      title: ' 해당 컨텐츠를 삭제하시겠습니까?',
      centered: true,
      children: <ConfirmModal id={item.id} listName={selectedCategory} />,
    });
  };

  const trashClick = e => {
    handleDeleteClick(e, { id: item?.id, selectedCategory });

    setSelectedItem(null);
  };

  return (
    <>
      <Accordion.Item value={item.title} key={item.id} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Accordion.Control px={8}>
          <Flex direction="row" justify="space-between" align="center">
            <ItemTitle {...item} />
            <ThemeIcon variant="transparent" onClick={trashClick} ref={iconTrashRef} opacity={0}>
              <IconTrash size={16} />
            </ThemeIcon>
          </Flex>
        </Accordion.Control>
        <Accordion.Panel w="90%" ml={55} mt={-15} mb={20}>
          <Flex direction="column" align="flex-start" gap={3}>
            <DateEditor id={item?.id} date={item?.modified_at} />
            <div>
              <Tooltip label="더보기" position="bottom-end" withArrow withinPortal>
                <Button m={0} pl={0} pb={3} variant="transparent" onClick={DetailClick} fz={12} aria-label="more">
                  <Text fz="sm">상세페이지로</Text>
                  <ThemeIcon variant="transparent">
                    <IconLayersLinked size={16} />
                  </ThemeIcon>
                </Button>
              </Tooltip>
            </div>
            <ActionIcons size={16} id={item.id} type={item.type} category={selectedCategory} />
          </Flex>
        </Accordion.Panel>
      </Accordion.Item>
    </>
  );
};

export default Item;
