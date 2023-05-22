import parse from 'html-react-parser';
import styled from '@emotion/styled';
import { Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { showDetailModal } from '../../../utils';

const Container = styled(Text)`
  cursor: pointer;
  margin-bottom: var(--mantine-spacing-sm);
  font-weight: 400;
`;

const ResultItem = ({ id, title, name, reg, type }) => {
  const bigScreen = useMediaQuery('(max-width: 125rem )');

  return (
    <Container
      key={id}
      onClick={() => {
        showDetailModal(id, type, bigScreen);
      }}>
      {parse((title || name).replace(reg, match => `<b>${match}</b>`))}
    </Container>
  );
};

export default ResultItem;
