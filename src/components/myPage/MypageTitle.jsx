import { useState } from 'react';
import { Title, Button, Container, TextInput } from '@mantine/core';
import { IconPencil } from '@tabler/icons-react';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import userState from '../../recoil/atom/userState';

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
  const { name } = useRecoilValue(userState);

  const [userName, setUserName] = useState(name);
  const [editMode, setEditMode] = useState(false);

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
            value={userName}
            onChange={e => {
              setUserName(e.currentTarget.value);
            }}
            onKeyUp={handleKeyUp}
            placeholder="Your Name"
            ref={node => node?.focus()}
          />
        ) : (
          userName
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
