import styled from '@emotion/styled';
import { Box, CloseButton } from '@mantine/core';
import { PROVIDERS } from '../../../constants';

const Wrapper = styled(Box)`
  display: flex;
  cursor: default;
  align-items: center;
  height: 1.875rem;
  background-color: ${({ theme }) => (theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white)};
  border: 0.0625rem solid ${({ theme }) => (theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[4])};
  padding-left: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.radius.sm};
`;

const TextBox = styled(Box)`
  line-height: 1;
  font-size: 0.75rem;
`;

const Value = ({ value, label, onRemove }) => {
  const badgePath = PROVIDERS[value].providerImgPath;

  return (
    <Wrapper>
      <Box mr={10}>
        {
          <Box w={20}>
            <img src={`/${badgePath}`} alt="value" />
          </Box>
        }
      </Box>
      <TextBox>{label}</TextBox>
      <CloseButton onMouseDown={onRemove} variant="transparent" size={22} iconSize={14} tabIndex={-1} />
    </Wrapper>
  );
};

export default Value;
