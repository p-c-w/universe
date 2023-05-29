import { useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { IconLayersLinked, IconTrash } from '@tabler/icons-react';
import { Text, Accordion, Tooltip, Button, ThemeIcon, Flex } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useMediaQuery } from '@mantine/hooks';
import { categoryState, selectedItemState } from '../../../recoil/atom';
import { ItemTitle, DateEditor, ConfirmModal } from '.';
import { ActionIcons } from '../../common';
import { showDetailModal } from '../../../utils';

const Item = ({ item }) => {
  const iconTrashRef = useRef(null);
  const selectedCategory = useRecoilValue(categoryState);
  const setSelectedItem = useSetRecoilState(selectedItemState);

  const bigScreen = useMediaQuery('(max-width: 125rem )');

  const showIconTrash = () => {
    iconTrashRef.current.style.opacity = 1;
  };

  const hideIconTrash = () => {
    iconTrashRef.current.style.opacity = 0;
  };

  const ClickTrashIcon = e => {
    e.stopPropagation();

    modals.open({
      title: ' 해당 컨텐츠를 삭제하시겠습니까?',
      centered: true,
      children: <ConfirmModal id={item.id} listName={selectedCategory} />,
    });

    setSelectedItem('');
  };

  return (
    <>
      <Accordion.Item value={item.title} key={item.id} onMouseEnter={showIconTrash} onMouseLeave={hideIconTrash}>
        <Accordion.Control px={8}>
          <Flex direction="row" justify="space-between" align="center">
            <ItemTitle {...item} />
            <ThemeIcon variant="transparent" onClick={ClickTrashIcon} ref={iconTrashRef} opacity={0}>
              <IconTrash size={16} />
            </ThemeIcon>
          </Flex>
        </Accordion.Control>
        <Accordion.Panel w="90%" ml={55} mt={-15} mb={20}>
          <Flex direction="column" align="flex-start" gap={3}>
            <DateEditor id={item?.id} date={item?.modified_at} />
            <div>
              <Tooltip label="더보기" position="bottom-end" withArrow withinPortal>
                <Button
                  m={0}
                  pl={0}
                  pb={3}
                  variant="transparent"
                  onClick={() => {
                    showDetailModal(item.id, item.type, bigScreen);
                  }}
                  fz={12}
                  aria-label="more">
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
