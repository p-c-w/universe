import React from 'react';
import { Modal } from '@mantine/core';
import { DetailModal } from '.';
import { useContentDetailQuery } from '../../hooks/queries';

const DetailModalWrapper = ({ opened, close, id, type }) => {
  const { data, isSuccess } = useContentDetailQuery({ type, id });

  return (
    <>
      <Modal.Root opened={opened} onClose={close} mih={500} size={1000} centered zIndex="9999">
        {isSuccess && <DetailModal opened={opened} close={close} type={type} movie={data} />}{' '}
      </Modal.Root>
    </>
  );
};

export default DetailModalWrapper;
