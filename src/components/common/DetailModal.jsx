import React from 'react';

import { Modal, Image, Grid, Container, Flex, Title, Text, Overlay, ScrollArea, Badge } from '@mantine/core';
import styled from '@emotion/styled';
import Badges from '../Badges';
import PROVIDERS from '../../constants/providers';

import { useProviderQueries } from '../../hooks/queries';

import { getProvidersByIds } from '../../utils';
import { ActionIcons } from '.';
import genres from '../../constants/genres';

const CloseBtn = styled(Modal.CloseButton)`
  z-index: 999;
`;

const Body = styled(Modal.Body)`
  z-index: 2;
`;

const DetailModal = ({
  type,
  movie: { id, backdrop_path: backdropPath, poster_path: posterPath, overview, title, genres: genreIds },
}) => {
  const queries = useProviderQueries([{ id, type }], {
    select: data => ({
      id: data.id,
      providers: data.results.KR
        ? data.results.KR.flatrate
            ?.map(provider => provider.provider_id)
            ?.filter(id => Object.prototype.hasOwnProperty.call(PROVIDERS, id))
        : [],
    }),
  });

  const providers = queries.map(({ data }) => data).filter(({ providers }) => providers !== undefined);

  const providerIds = getProvidersByIds(providers[0]?.providers);

  return (
    <>
      <Modal.Overlay />
      <Modal.Content pos="relative">
        <Overlay c="#000" opacity={0.75} zIndex="1" />
        <Image src={`https://image.tmdb.org/t/p/w780${backdropPath}` || undefined}></Image>
        <Container>
          <Badges providers={providerIds} spacing="sm" size="2.5rem" />
        </Container>
        <CloseBtn pos="absolute" top={10} right={20} />
        <Body m={40} c="#fff" pos="absolute" top={0}>
          <Grid columns={5}>
            <Grid.Col span={3}>
              <Container>
                <Title order={1} mb="xs" mt="xs">
                  {title}
                </Title>
                <Text my="sm" pl={3}>
                  2023
                </Text>
                <Flex justify={'space-between'}>
                  <Flex maw={200} wrap="wrap" mb="lg">
                    {genreIds.map(({ id, name }) => (
                      <Badge color={genres[type][id].color} key={id}>
                        {name}
                      </Badge>
                    ))}
                  </Flex>
                  <ActionIcons size={17} id={id} type={type} />
                </Flex>
                <ScrollArea fw={300} fz="sm" h={200}>
                  {overview}
                </ScrollArea>
              </Container>
            </Grid.Col>
            <Grid.Col span={2}>
              <Container m={10}>
                <Image src={`https://image.tmdb.org/t/p/w342${posterPath}` || undefined} />
              </Container>
            </Grid.Col>
          </Grid>
        </Body>
      </Modal.Content>
    </>
  );
};
export default DetailModal;
