import { Suspense, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import styled from '@emotion/styled';
import { TextInput, ActionIcon, useMantineColorScheme, Loader } from '@mantine/core';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';
import { useSearchResultQueries } from '../../hooks/queries';
import SearchResult from './SearchResult';

const Container = styled.div`
  margin: 0 1.875rem;
  width: 100%;
`;

const InputWrapper = styled.div`
  position: relative;

  width: 500px;
  margin: 0 auto;
`;

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [debounced] = useDebouncedValue(searchInput, 300);

  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <Container>
      <InputWrapper>
        <TextInput
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
          value={searchInput}
          onChange={event => setSearchInput(event.currentTarget.value)}
        />
        {debounced && (
          <Suspense fallback={<Loader color={dark ? 'violet' : 'dark'} />}>
            <SearchResult input={debounced} />
          </Suspense>
        )}
      </InputWrapper>
    </Container>
  );
};

export default SearchBar;
