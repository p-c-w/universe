import { useState } from 'react';
import { Title, Button, Container, TextInput, Input } from '@mantine/core';
import { IconPencil } from '@tabler/icons-react';
import styled from '@emotion/styled';

const StyledContainer = styled(Container)`
  display: flex;
  gap: 0.2rem;
  margin: 0;
  padding: 0;
`;

const PageTitle = styled(Title)`
  display: flex;
  align-items: center;
`;

const NameInput = styled(TextInput)`
  width: 15rem;
  input {
    font-size: 2rem;
    color: gray;
    font-weight: 700;
  }
`;

const MypageTitle = () => {
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState('OOO');

  return (
    <StyledContainer mb="1rem" spacing={5} align="start">
      <PageTitle order={1} size={40} fw={900}>
        {editMode ? (
          <NameInput
            variant="unstyled"
            value={value}
            onChange={e => {
              setValue(e.currentTarget.value);
            }}
            placeholder="Your Name"
            ref={node => node?.focus()}
          />
        ) : (
          `OOO`
        )}
        &apos;s Universe
      </PageTitle>
      <Button
        variant="subtle"
        compact
        onClick={() => {
          setEditMode(!editMode);
        }}>
        <IconPencil size={15} />
      </Button>
    </StyledContainer>
  );
};

export default MypageTitle;
