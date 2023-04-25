import styled from '@emotion/styled';
import { TextInput, ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';

const Container = styled.div`
  margin: 0 1.875rem;
  width: 100%;
`;

const InputWrapper = styled.div`
  width: 500px;
  margin: 0 auto;
`;

const Input = styled(TextInput)``;

const SearchBar = () => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <Container>
      <InputWrapper>
        <Input
          icon={<IconSearch size="1.1rem" stroke={1.5} />}
          radius="xl"
          size="sm"
          color={dark ? 'violet' : 'dark'}
          rightSection={
            <ActionIcon size="sm" radius="xl" color={dark ? 'dark' : 'gray'} variant={dark ? 'filled' : 'light'}>
              <IconArrowRight size="1.1rem" stroke={1.5} />
            </ActionIcon>
          }
          placeholder="Search for a movie, tv show"
          rightSectionWidth={42}
        />
      </InputWrapper>
    </Container>
  );
};

export default SearchBar;
