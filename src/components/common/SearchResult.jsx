import { forwardRef, useEffect, useRef } from 'react';
import { Container, Flex, ScrollArea, Space, Text, Title } from '@mantine/core';
import styled from '@emotion/styled';
import { useMediaQuery } from '@mantine/hooks';
import { useSearchResultQueries } from '../../hooks/queries';

import { Result } from '.';

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
  const smallScreen = useMediaQuery('(max-width: 60rem)');

  useEffect(() => {
    userInputRegex.current = new RegExp(input, 'i');
  }, [input]);

  return (
    <ResultContiner
      ref={ref}
      pos="absolute"
      w={smallScreen ? 250 : 450}
      px={smallScreen ? 'xs' : 'lg'}
      pt="1.875rem"
      pb="1.875rem"
      left="0"
      c="gray.7"
      bg="white">
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
                  <Result
                    key={id}
                    id={id}
                    title={title}
                    name={name}
                    reg={userInputRegex.current}
                    type={mediaType[idx]}
                  />
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
