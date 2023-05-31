import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import { Title, Button, TextInput } from '@mantine/core';
import { IconPencil } from '@tabler/icons-react';
import { useUserQuery } from '../../../hooks/queries';
import { useUpdateUserNameMutation } from '../../../hooks/mutations';
import { userState } from '../../../recoil/atom';

const PageTitle = styled(Title)`
  align-items: center;
`;

const NameInput = styled(TextInput)`
  input {
    font-size: 2rem;
    color: gray;
    font-weight: 700;
    -webkit-text-fill-color: gray;
    ::placeholder {
      font-size: 0.8em;
    }
  }
`;

const TitleContent = () => {
  const email = useRecoilValue(userState);

  const { userInfo: name } = useUserQuery({
    select: userInfo => userInfo.name,
    refetchOnWindowFocus: false,
  });
  const { mutate: updateUserName } = useUpdateUserNameMutation();

  const [userName, setUserName] = useState(name);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setUserName(name);
  }, [name]);

  const changeUserName = e => {
    const content = userName.trim();

    if (e.key === 'Escape') {
      setUserName(name);
      setEditMode(false);
      return;
    }

    if (e.key === 'Enter') {
      if (content) {
        updateUserName({ email, name: content });
      } else {
        setUserName(name);
      }
      setEditMode(false);
    }
  };

  const clickEditIcon = () => {
    const content = userName.trim();
    if (editMode) {
      updateUserName({ email, name: content });
    }
    setEditMode(!editMode);
  };

  return (
    <>
      <PageTitle
        display="flex"
        order={1}
        size={40}
        fw={900}
        variant="gradient"
        gradient={{ from: 'violet', to: 'cyan', deg: 145 }}>
        {editMode ? (
          <NameInput
            w="auto"
            variant="unstyled"
            value={userName}
            onChange={e => {
              setUserName(e.currentTarget.value);
            }}
            onKeyUp={changeUserName}
            placeholder="Enter your name"
            ref={node => node?.focus()}
          />
        ) : (
          userName
        )}
        {!editMode && "'s Universe"}
      </PageTitle>
      <Button variant="subtle" compact aria-label="edit button" onClick={clickEditIcon}>
        <IconPencil size={15} />
      </Button>
    </>
  );
};

export default TitleContent;
