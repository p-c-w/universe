import { forwardRef, useEffect, useRef } from 'react';
import { Container, ScrollArea, Space, Text, Title } from '@mantine/core';
import styled from '@emotion/styled';
import { useSearchResultQueries } from '../../../hooks/queries';
import { ResultItem } from '.';

const mediaType = ['movie', 'tv'];

const ResultContiner = styled(Container)`
  position: absolute;
  left: 0;
  width: 28.125rem;
  padding: var(--mantine-spacing-lg) var(--mantine-spacing-xl);
  color: var(--mantine-color-dark-5);
  background-color: var(--mantine-color-white);
  border-radius: 0.9375rem;
`;

const UnderLineTitle = styled(Title)`
  border-bottom: 0.0938rem solid var(--mantine-color-dark-5);
  margin-bottom: var(--mantine-spacing-sm);
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
    <ResultContiner ref={ref}>
      {searchResults.map((searchResult, idx) => (
        <Container key={idx} p={0}>
          <UnderLineTitle order={5} tt="uppercase">
            {mediaType[idx]}
          </UnderLineTitle>
          {searchResult.length === 0 ? (
            <Text mb="sm" fw={400}>
              {'검색결과가 없습니다.'}
            </Text>
          ) : (
            <Scroll mah={200} type="always">
              {searchResult.map(({ id, title, name }) => (
                <ResultItem
                  key={id}
                  id={id}
                  title={title}
                  name={name}
                  reg={userInputRegex.current}
                  type={mediaType[idx]}
                />
              ))}
            </Scroll>
          )}
          <Space h="md" />
        </Container>
      ))}
    </ResultContiner>
  );
});

export default SearchResult;
