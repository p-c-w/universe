import { Suspense } from 'react';
import styled from '@emotion/styled';
import parse from 'html-react-parser';
import { Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { DetailModal, ModalSkeleton } from '..';

const Container = styled(Text)`
  cursor: pointer;
`;

const ResultItem = ({ id, title, name, reg, type }) => {
  const DetailClick = () => {
    modals.open({
      centered: true,
      withCloseButton: false,
      size: 950,
      padding: 0,
      m: 0,
      children: (
        <Suspense fallback={<ModalSkeleton />}>
          <DetailModal id={id} type={type} />
        </Suspense>
      ),
    });
  };

  return (
    <Container key={id} mb="sm" fw={400} onClick={DetailClick}>
      {parse((title || name).replace(reg, match => `<b>${match}</b>`))}
    </Container>
  );
};

export default ResultItem;
