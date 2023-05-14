import React from 'react';
import { Modal, Text, Button } from '@mantine/core';
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
      <Modal opened={opened} title="정말 해당 컨텐트를 삭제하시겠습니까?">
        <Button onClick={close}>아니오</Button>
        <Button onClick={handleTrashClick}>네</Button>
      </Modal>
    </>
  );
};

export default ConfirmModal;
