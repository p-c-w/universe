import { Suspense } from 'react';
import { Modal, Image, Container, Title, Flex, Text, Overlay, ScrollArea, Badge } from '@mantine/core';
import { IconClockPlay } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import styled from '@emotion/styled';
import { useProviderQueries, useContentDetailQuery } from '../../../hooks/queries';
import { ActionIcons, ProviderAvatars } from '..';
import genres from '../../../constants/genres';
import { TMDB_IMG_URL } from '../../../constants';
import { ModalSkeleton } from '../../../loaders';

const convertRuntime = runtime => {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}시간 ${minutes}분`;
};

const CloseButton = styled(Modal.CloseButton)`
  z-index: 999;
  position: absolute;
  top: 0.625rem;
  right: 1.25rem;
`;

const Body = styled(Flex)`
  z-index: 2;
  position: absolute;
  top: 0;
  color: white;
  padding: '2em';
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
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

  const bigScreen = useMediaQuery('(max-width: 125rem )');
  const smallScreen = useMediaQuery('(min-width: 100rem )');

  const { queries, isAllSuccess } = useProviderQueries([{ id, type }]);

  if (!isAllSuccess) return <ModalSkeleton />;

  const providers = queries.map(({ data }) => data).filter(({ providers }) => providers !== undefined);

  const providerIds = providers[0]?.providers;

  return (
    <Container pos="relative" m={0} p={0} fluid fz={smallScreen ? '23px' : '20px'}>
      <Overlay c="balck" opacity={0.75} zIndex="1" w="100%" />
      <CloseButton />
      {backdropPath ? (
        <Image src={`${TMDB_IMG_URL}/w1280${backdropPath}`} />
      ) : (
        <Container w="100%" h={535} bg="dark.8" />
      )}
      <Body>
        <Container m={bigScreen ? '2em' : '3em'} mr={0} w="80%">
          <Title order={smallScreen ? 1 : 2} mb="xs" mt="lg" fz="1.5em">
            {title || tvName}
          </Title>
          {smallScreen && (
            <Title order={2} mb="xs" fz="0.9em" mt="xs">
              {originTitle || originName}
            </Title>
          )}
          <Flex my="sm" direction="row" gap="xs" align="center" fz="0.8em">
            <Text mr="xs">{relaseDate || firstAirDate}</Text>
            {runtime ? (
              <>
                <IconClockPlay size={17} />
                <Text>{convertRuntime(runtime)}</Text>
              </>
            ) : (
              <Text>{seasons > 1 ? `시즌 ${seasons}개` : episodes ? `에피소드 ${episodes}개` : ''}</Text>
            )}
          </Flex>
          <Flex justify="space-between">
            <Flex maw={smallScreen ? '15vw' : '200px'} wrap="wrap" gap={5}>
              {genreIds.map(({ id, name }) => (
                <Badge color={genres[type][id].color} key={id}>
                  {name}
                </Badge>
              ))}
            </Flex>
            <Suspense>
              <ActionIcons size={20} id={id} type={type} />
            </Suspense>
          </Flex>
          <ScrollArea fw={300} w="100%" h={smallScreen ? '20vh' : '200px'} m={10}>
            <Title my="xs" order={smallScreen ? 3 : 4} color="grey" italic fz="0.9em">
              {tagline}
            </Title>
            <Text fz="0.7em"> {overview}</Text>
          </ScrollArea>
        </Container>
        <Container m="2em">
          <Flex direction="column" w="100%" justify="center" align="center">
            {posterPath ? (
              <Image src={`${TMDB_IMG_URL}/w342${posterPath}`} />
            ) : (
              <Container bg="dark.7" w={smallScreen ? 230 : 185} h={smallScreen ? 354 : 280} p={0} />
            )}
            <Container bg="rgba(71, 68, 68, 0.211)" w="100%" p={10} display="flex">
              <ProviderAvatars providerIds={providerIds} spacing="xs" size={smallScreen ? 45 : 35} />
            </Container>
          </Flex>
        </Container>
      </Body>
    </Container>
  );
};

export default DetailModal;
