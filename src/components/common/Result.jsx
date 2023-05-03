import React, { Suspense } from 'react';
import parse from 'html-react-parser';
import { Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { DetailModalWrapper, ModalSkeleton } from '.';

const SearchResult = ({ id, title, name, reg, type }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Text key={id} mb="sm" fw={400} onClick={open}>
        {parse((title || name).replace(reg, match => `<b>${match}</b>`))}
      </Text>
      {opened && (
        <Suspense fallback={<ModalSkeleton />}>
          <DetailModalWrapper opened={opened} close={close} id={id} type={type} />
        </Suspense>
      )}
    </>
  );
};

export default SearchResult;
