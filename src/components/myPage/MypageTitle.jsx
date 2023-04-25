import { useState, useEffect } from 'react';
import { Title, Button, Container, TextInput, Input } from '@mantine/core';
import { IconPencil } from '@tabler/icons-react';
import styled from '@emotion/styled';
import useUserQuery from '../../hooks/queries/useUserQuery';

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
  const { data: userName } = useUserQuery('snowlover@gmail.com', { select: user => user.name });

  const [value, setValue] = useState(userName);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setValue(userName);
  }, [userName]);

  const handleKeyUp = e => {
    const content = e.target.value.trim();
    if (e.key !== 'Enter' || content === '') return;
    setEditMode(false);
  };

  return (
    <StyledContainer mb="1rem" spacing={5} align="start">
      <PageTitle order={1} size={40} fw={900} variant="gradient" gradient={{ from: 'violet', to: 'cyan', deg: 145 }}>
        {editMode ? (
          <NameInput
            variant="unstyled"
            value={value}
            onChange={e => {
              setValue(e.currentTarget.value);
            }}
            onKeyUp={handleKeyUp}
            placeholder="Your Name"
            ref={node => node?.focus()}
          />
        ) : (
          value
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
