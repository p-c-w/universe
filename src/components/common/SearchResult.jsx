import { forwardRef, useEffect, useRef } from 'react';
import parse from 'html-react-parser';
import { Container, Flex, ScrollArea, Space, Text, Title } from '@mantine/core';
import styled from '@emotion/styled';
import { useSearchResultQueries } from '../../hooks/queries';

const mediaType = ['movie', 'tv'];

const ResultContiner = styled(Container)`
  border-radius: 0.9375rem;
`;

const Scroll = styled(ScrollArea.Autosize)`
  & [data-orientation='vertical'] {
    border-radius: 0.3125rem;
  }
  & [data-orientation='vertical']:hover,
  & [data-orientation='horizontal']:hover {
    background-color: var(--mantine-color-gray-1);
  }

  & [data-orientation='vertical']:hover,
  & [data-orientation='horizontal']:hover {
    background-color: var(--mantine-color-gray-1);
  }

  & [data-orientation='vertical'] .mantine-ScrollArea-thumb,
  & [data-orientation='horizontal'] .mantine-ScrollArea-thumb {
    background-color: var(--mantine-color-gray-3);
  }
`;

const SearchResult = forwardRef(({ input }, ref) => {
  const searchResults = useSearchResultQueries(mediaType, input);
  const userInputRegex = useRef(null);

  useEffect(() => {
    userInputRegex.current = new RegExp(input, 'i');
  }, [input]);

  return (
    <ResultContiner ref={ref} pos="absolute" w={450} px="lg" pt="1.875rem" pb="1.875rem" left="0" c="gray.7" bg="white">
      {searchResults.map((searchResult, idx) => (
        <Container key={idx}>
          <Flex align="center" justify="space-between">
            <Title order={5} tt="uppercase">
              {mediaType[idx]}
            </Title>
          </Flex>
          <hr />
          {searchResult.length === 0 ? (
            <>
              <Text mb="sm" fw={400}>
                {'검색결과가 없습니다.'}
              </Text>
            </>
          ) : (
            <>
              <Scroll mah={200} type="always">
                {searchResult.map(({ id, title, name }) => (
                  <Text key={id} mb="sm" fw={400}>
                    {parse((title || name).replace(userInputRegex.current, match => `<b>${match}</b>`))}
                  </Text>
                ))}
              </Scroll>
            </>
          )}
          <Space h="md" />
        </Container>
      ))}
    </ResultContiner>
  );
});

export default SearchResult;
