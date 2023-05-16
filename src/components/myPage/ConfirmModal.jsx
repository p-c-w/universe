import React from 'react';
import { Modal, Button, Flex } from '@mantine/core';
import { useRecoilValue } from 'recoil';
import { useDeleteUserContentMutation } from '../../hooks/mutations';
import { userState } from '../../recoil/atom';

const ConfirmModal = ({ opened, close, id, listName, setIsItemSelected, setSelectedItem }) => {
  const email = useRecoilValue(userState);

  const { mutate: deleteUserContent } = useDeleteUserContentMutation();

  const handleTrashClick = e => {
    e.stopPropagation();
    deleteUserContent({ email, list: `${listName}_list`, id });
    close();
    setSelectedItem(null);
    setIsItemSelected(false);
  };

  return (
    <>
      <Modal opened={opened} onClose={close} centered title=" 해당 컨텐츠를 삭제하시겠습니까?">
        <Flex justify={'flex-end'} gap={7} my={10}>
          <Button onClick={handleTrashClick}>삭제하기</Button>
          <Button onClick={close} color="gray">
            취소하기
          </Button>
        </Flex>
      </Modal>
    </>
  );
};

export default ConfirmModal;
