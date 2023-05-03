import { Modal, Image, Grid, Container, Title, Flex, Text, Overlay, ScrollArea, Badge } from '@mantine/core';
import styled from '@emotion/styled';
import { IconClockPlay } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import Badges from '../Badges';
import { PROVIDERS } from '../../constants';

import { useProviderQueries } from '../../hooks/queries';

import { getProvidersByIds } from '../../utils';
import { ActionIcons } from '.';
import genres from '../../constants/genres';

const BadgeContainer = styled(Container)`
  z-index: 999;
`;

const CloseBtn = styled(Modal.CloseButton)`
  z-index: 999;
`;

const Body = styled(Modal.Body)`
  z-index: 2;
`;

const convertRuntime = runtime => {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}시간 ${minutes}분`;
};

const DetailModal = ({ type, movie }) => {
  const {
    id,
    title,
    name: tvName,
    original_title: originTitle,
    original_name: originName,
    backdrop_path: backdropPath,
    poster_path: posterPath,
    overview,
    genres: genreIds,
    release_date: relaseDate,
    runtime,
    tagline,
    first_air_date: firstAirDate,
    number_of_seasons: seasons,
    number_of_episodes: episodes,
  } = movie;

  const smallScreen = useMediaQuery('(min-width: 60rem)');

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
      <Modal.Content miw={630} pos="relative">
        <Overlay c="#000" opacity={0.75} zIndex="1" />
        <Image src={`https://image.tmdb.org/t/p/w780${backdropPath}` || undefined}></Image>
        <CloseBtn pos="absolute" top={10} right={20} />
        <Body m={40} c="#fff" pos="absolute" top={0}>
          <Grid columns={3}>
            <Grid.Col span={2}>
              <Container>
                <Title order={1} mb="xs" mt="lg">
                  {title || tvName}
                </Title>
                <Title order={3} mb="xs" mt="xs">
                  {originTitle || originName}
                </Title>
                <Flex my="sm" direction="row" gap="xs" align="center">
                  <Text mr="xs">{relaseDate || firstAirDate}</Text>
                  {runtime ? (
                    <>
                      <IconClockPlay size={17} />
                      <Text>{convertRuntime(runtime)}</Text>
                    </>
                  ) : (
                    <Text>{seasons > 1 ? `시즌 ${seasons}개` : `에피소드 ${episodes}개`}</Text>
                  )}
                </Flex>
                <Flex justify={'space-between'} ml={'lg'}>
                  <Flex maw={200} wrap="wrap">
                    {genreIds.map(({ id, name }) => (
                      <Badge color={genres[type][id].color} key={id}>
                        {name}
                      </Badge>
                    ))}
                  </Flex>
                  <ActionIcons size={20} id={id} type={type} />
                </Flex>
                {smallScreen && (
                  <ScrollArea fw={300} fz="sm" w={450} h={250} m={10}>
                    <Title my="xs" w={450} order={3} color="grey" italic>
                      {tagline}
                    </Title>
                    {overview}
                  </ScrollArea>
                )}
              </Container>
            </Grid.Col>
            <Grid.Col span={1}>
              <Flex direction={'column'} m={10}>
                <Image src={`https://image.tmdb.org/t/p/w342${posterPath}` || undefined} />
                <Container bg="rgba(71, 68, 68, 0.211)" w="100%" p={10}>
                  <BadgeContainer display="flex">
                    <Badges providers={providerIds} spacing="xs" size={45} />
                  </BadgeContainer>
                </Container>
              </Flex>
            </Grid.Col>
          </Grid>
        </Body>
      </Modal.Content>
    </>
  );
};
export default DetailModal;
