import { Suspense } from 'react';
import { Modal, Image, Grid, Container, Title, Flex, Text, Overlay, ScrollArea, Badge } from '@mantine/core';
import { IconClockPlay } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import styled from '@emotion/styled';
import { useProviderQueries, useContentDetailQuery } from '../../hooks/queries';
import { getProvidersByIds } from '../../utils';
import { ActionIcons, Badges } from '.';
import genres from '../../constants/genres';

const convertRuntime = runtime => {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}시간 ${minutes}분`;
};

const CloseBtn = styled(Modal.CloseButton)`
  z-index: 999;
`;

const Body = styled(Grid)`
  z-index: 2;
`;

const DetailModal = ({ id, type }) => {
  const { data } = useContentDetailQuery({ type, id });

  const {
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
  } = data;

  const smallScreen = useMediaQuery('(min-width: 48rem)');
  const midScreen = useMediaQuery('(min-width: 60rem)');

  const queries = useProviderQueries([{ id, type }]);

  const providers = queries.map(({ data }) => data).filter(({ providers }) => providers !== undefined);

  const providerIds = getProvidersByIds(providers[0]?.providers);

  return (
    <Container pos="relative" m={0} p={0}>
      <Overlay c="#000" opacity={0.75} zIndex="1" />
      <CloseBtn pos="absolute" top={10} right={20} />
      {backdropPath ? (
        <Image src={`https://image.tmdb.org/t/p/w780${backdropPath}`} />
      ) : (
        <Container w={950} h={535} bg="dark.5" />
      )}
      <Body m={40} c="#fff" columns={3} pos="absolute" top={0}>
        <Grid.Col span={2}>
          <Container>
            <Title order={midScreen ? 1 : 2} mb="xs" mt="lg">
              {title || tvName}
            </Title>
            {midScreen && (
              <Title order={3} mb="xs" mt="xs">
                {originTitle || originName}
              </Title>
            )}
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
            <Flex justify="space-between" ml="lg">
              <Flex maw={200} wrap="wrap" gap={5}>
                {genreIds.map(({ id, name }) => (
                  <Badge color={genres[type][id].color} key={id}>
                    {name}
                  </Badge>
                ))}
              </Flex>
              <Suspense fallback={<div>...loading</div>}>
                <ActionIcons size={20} id={id} type={type} />
              </Suspense>
            </Flex>
            <ScrollArea fw={300} fz="sm" w={midScreen ? 450 : 350} h={midScreen ? 240 : 150} m={10}>
              <Title my="xs" w={450} order={midScreen ? 3 : 4} color="grey" italic>
                {tagline}
              </Title>
              {overview}
            </ScrollArea>
          </Container>
        </Grid.Col>
        <Grid.Col span={1}>
          <Flex direction="column" m={10} justify={'center'} align={'center'}>
            {posterPath ? (
              <Image src={`https://image.tmdb.org/t/p/w${smallScreen ? 342 : 185}${posterPath}`} />
            ) : (
              <Container bg="dark.7" w={smallScreen ? 230 : 185} h={smallScreen ? 354 : 280} p={0} />
            )}
            <Container bg="rgba(71, 68, 68, 0.211)" w="100%" p={10}>
              <Container display="flex">
                <Badges providers={providerIds} spacing="xs" size={45} />
              </Container>
            </Container>
          </Flex>
        </Grid.Col>
      </Body>
    </Container>
  );
};

export default DetailModal;
