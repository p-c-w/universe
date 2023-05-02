import { Modal, Image, Grid, Container, Title, Text, Overlay, ScrollArea, Badge } from '@mantine/core';
import styled from '@emotion/styled';
import Badges from '../Badges';
import PROVIDERS from '../../constants/providers';

import { useProviderQueries } from '../../hooks/queries';

import { getProvidersByIds } from '../../utils';
import { ActionIcons } from '.';
import genres from '../../constants/genres';

const BadgeContainer = styled.div`
  width: 100%;
  padding: 0 1.875rem;
  display: flex;
  position: absolute;
  justify-content: space-between;
  bottom: 1rem;
  z-index: 999;
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
        <BadgeContainer>
          <Badges providers={providerIds} spacing="sm" size="2.5rem" />
          <ActionIcons size={10} id={id} type={type} />
        </BadgeContainer>
        <Modal.CloseButton style={{ zIndex: '999' }} pos="absolute" top={10} right={20} />
        <Modal.Body m={40} c="#fff" style={{ zIndex: '2' }} pos="absolute" top={0}>
          <Grid columns={5}>
            <Grid.Col span={3}>
              <Container>
                <Title order={1} mb={10} mt={10}>
                  {title}
                </Title>
                <Text>2023</Text>
                {genreIds.map(({ id, name }) => (
                  <Badge color={genres[type][id].color} key={id}>
                    {name}
                  </Badge>
                ))}
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
        </Modal.Body>
      </Modal.Content>
    </>
  );
};
export default DetailModal;
