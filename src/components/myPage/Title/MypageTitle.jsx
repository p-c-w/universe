import { useState, useEffect } from 'react';
import { Title, Button, Container, TextInput } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconPencil } from '@tabler/icons-react';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { useUserQuery } from '../../../hooks/queries';
import { useUpdateUserNameMutation } from '../../../hooks/mutations';
import { userState } from '../../../recoil/atom';

const PageTitle = styled(Title)`
  display: flex;
  align-items: center;
`;

const NameInput = styled(TextInput)`
  input {
    font-size: 2rem;
    color: gray;
    font-weight: 700;
    -webkit-text-fill-color: gray;
  }
`;

const MypageTitle = () => {
  const smallScreen = useMediaQuery('(max-width: 48rem)');

  const email = useRecoilValue(userState);

  const { userInfo: name } = useUserQuery({ select: userInfo => userInfo.name });
  const { mutate: updateUserName } = useUpdateUserNameMutation();

  const [userName, setUserName] = useState(name);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setUserName(name);
  }, [name]);

  const handleKeyUp = e => {
    if (e.key === 'Escape') {
      setUserName(name);
      setEditMode(false);
    }

    const content = userName.trim();
    if (e.key !== 'Enter' || content === '') return;
    updateUserName({ email, name: content });
    setEditMode(false);
  };

  return (
    <Container m={0} mb={16} p={0} spacing={5} miw={350} display="flex" gap={3.2} align="start">
      <PageTitle
        order={1}
        size={smallScreen ? 35 : 40}
        display="flex"
        fw={900}
        variant="gradient"
        gradient={{ from: 'violet', to: 'cyan', deg: 145 }}>
        {editMode ? (
          <NameInput
            w={smallScreen ? 200 : 400}
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
    </Container>
  );
};

export default MypageTitle;
