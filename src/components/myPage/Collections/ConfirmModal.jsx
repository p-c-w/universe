import { Button, Flex } from '@mantine/core';
import { useRecoilValue } from 'recoil';
import { modals } from '@mantine/modals';
import { useDeleteUserContentMutation } from '../../../hooks/mutations';
import { userState } from '../../../recoil/atom';

const ConfirmModal = ({ id, listName }) => {
  const email = useRecoilValue(userState);

  const { mutate: deleteUserContent } = useDeleteUserContentMutation();

  const clickDeleteButton = e => {
    e.stopPropagation();
    deleteUserContent({ email, list: `${listName}_list`, id });

    modals.closeAll();
  };

  return (
    <>
      <Flex justify="flex-end" gap={7} my={10}>
        <Button onClick={clickDeleteButton}>삭제하기</Button>
        <Button onClick={modals.closeAll} color="gray">
          취소하기
        </Button>
      </Flex>
    </>
  );
};

export default ConfirmModal;
