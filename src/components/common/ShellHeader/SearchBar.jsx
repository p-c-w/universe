import { Suspense, useState } from 'react';
import { useClickOutside, useDebouncedValue } from '@mantine/hooks';
import { TextInput, ActionIcon, useMantineColorScheme, Loader, Container, Flex } from '@mantine/core';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';
import styled from '@emotion/styled';
import { SearchResult } from '.';

const ResultContiner = styled(Flex)`
  border-radius: 0.9375rem;
`;

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [debounced] = useDebouncedValue(searchInput, 300);

  const [opened, setOpened] = useState(false);
  const ref = useClickOutside(() => setOpened(false));

  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const openResultContainer = () => setOpened(opened => !opened);
  const changeSearchInput = e => {
    if (!opened) {
      setOpened(true);
    }
    setSearchInput(e.currentTarget.value);
  };

  return (
    <Container pos="relative" w={450} mx="md" p={0}>
      <TextInput
        icon={<IconSearch size="1.1rem" stroke={1.5} />}
        p={0}
        fz={12}
        radius="xl"
        color={dark ? 'violet' : 'dark'}
        rightSection={
          <ActionIcon
            size="sm"
            radius="xl"
            color={dark ? 'dark' : 'gray'}
            variant={dark ? 'filled' : 'light'}
            aria-label="search button">
            <IconArrowRight size="1.1rem" stroke={1.5} />
          </ActionIcon>
        }
        placeholder="Search for a movie, tv show"
        rightSectionWidth={42}
        value={searchInput}
        onClick={openResultContainer}
        onChange={changeSearchInput}
      />
      {opened && debounced && (
        <Suspense
          fallback={
            <ResultContiner
              pos="absolute"
              w={450}
              left={0}
              align="center"
              justify="center"
              py="xl"
              c="gray.9"
              bg="rgba(255, 255, 255, 0.95)">
              <Loader size="md" color={dark ? 'violet' : 'dark'} />
            </ResultContiner>
          }>
          <SearchResult input={debounced} ref={ref} />
        </Suspense>
      )}
    </Container>
  );
};

export default SearchBar;
