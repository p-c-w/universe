import React from 'react';
import { Modal, Text, Button, Flex, Title } from '@mantine/core';
import { useDeleteUserContentMutation } from '../../hooks/mutations';
import { userState } from '../../recoil/atom';
import { useRecoilValue } from 'recoil';

const ConfirmModal = ({ opened, close, id, listName }) => {
  const email = useRecoilValue(userState);

  const { mutate: deleteUserContent } = useDeleteUserContentMutation();

  const handleTrashClick = e => {
    e.stopPropagation();
    deleteUserContent({ email, list: `${listName}_list`, id });
    close();
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
