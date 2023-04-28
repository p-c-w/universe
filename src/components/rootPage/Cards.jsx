import { IconHeart, IconHistory, IconMovie } from '@tabler/icons-react';
import {
  Container,
  Card,
  Image,
  Text,
  ActionIcon,
  Badge,
  Group,
  Flex,
  useMantineTheme,
  SimpleGrid,
  rem,
} from '@mantine/core';
import styled from '@emotion/styled';
import { useCallback, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import useMainBoardQuery from '../../hooks/useMainBoardQuery';
import useObsever from '../../hooks/useObsever';
import { ScrollObserver } from '../common';

import DetailModal from '../common/Detail/DetailModal';

const tvGenres = {
  10759: {
    name: '액션&모험',
    color: 'red',
  },

  16: {
    name: '애니메이션',
    color: 'grape',
  },
  35: {
    name: '코미디',
    color: 'violet',
  },
  80: {
    name: '범죄',
    color: 'indigo',
  },
  99: {
    name: '다큐멘터리',
    color: 'blue',
  },
  18: {
    name: '드라마',
    color: 'cyan',
  },
  10751: {
    name: '가족',
    color: 'teal',
  },
  10762: {
    name: '키즈',
    color: 'pink',
  },
  9648: {
    name: '미스터리',
    color: 'red',
  },
  10763: {
    name: '뉴스',
    color: 'lime',
  },
  10764: {
    name: '리얼리티',
    color: 'yellow',
  },
  10765: {
    name: 'SF&판타지',
    color: 'green',
  },
  10766: {
    name: '소프',
    color: 'orange',
  },
  10767: {
    name: '토크',
    color: 'pink',
  },
  10768: {
    name: '전쟁&정치',
    color: 'grape',
  },
  10770: {
    name: 'TV 영화',
    color: 'violet',
  },
  37: {
    name: '서부',
    color: 'cyan',
  },
};

const movieGenres = {
  28: {
    name: '액션',
    color: 'red',
  },
  12: {
    name: '모험',
    color: 'pink',
  },
  16: {
    name: '애니메이션',
    color: 'grape',
  },
  35: {
    name: '코미디',
    color: 'violet',
  },
  80: {
    name: '범죄',
    color: 'indigo',
  },
  99: {
    name: '다큐멘터리',
    color: 'blue',
  },
  18: {
    name: '드라마',
    color: 'cyan',
  },
  10751: {
    name: '가족',
    color: 'teal',
  },
  14: {
    name: '판타지',
    color: 'green',
  },
  36: {
    name: '역사',
    color: 'lime',
  },
  27: {
    name: '공포',
    color: 'yellow',
  },
  10402: {
    name: '음악',
    color: 'orange',
  },
  9648: {
    name: '미스터리',
    color: 'red',
  },
  10749: {
    name: '로맨스',
    color: 'pink',
  },
  878: {
    name: 'SF',
    color: 'grape',
  },
  10770: {
    name: 'TV 영화',
    color: 'violet',
  },
  53: {
    name: '스릴러',
    color: 'indigo',
  },
  10752: {
    name: '전쟁',
    color: 'blue',
  },
  37: {
    name: '서부',
    color: 'cyan',
  },
};

const CardGrid = styled(SimpleGrid)`
  position: relative;
  grid-template-columns: repeat(5, 15.75rem);
  margin: 0 auto;
`;

const StyledCard = styled(Card)`
  padding: 0;
  &:hover > div {
    opacity: 90%;
  }
  &:hover > div:last-child {
    opacity: 100%;
  }
`;

const Cover = styled(Container)`
  position: absolute;
  background-color: ${({ theme }) => `var(--mantine-color-${theme.colorScheme === 'dark' ? 'dark-9' : 'gray-1'})`};
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0%;
  transition: 0.3s ease;
`;

const HoverContainer = styled(Container)`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: 0.3s ease;
`;

const Title = styled(Text)`
  display: 'block';
  margin-top: var(--mantine-spacing-lg);
  margin-bottom: rem(5);
`;

const Action = styled(ActionIcon)`
  background-color: ${({ theme }) => (theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0])};

  &:hover {
    background-color: ${({ theme }) => (theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1])};
  }
`;

const Footer = styled(Group)`
  margin-top: var(--mantine-spacing-md);
  align-items: flex-start;
  flex-direction: column;
`;

const ArticleCard = ({
  setModalState,
  open,
  id,
  title,
  originalTitle,
  posterPath,
  backdropPath,
  overview,
  releaseDate,
  genreIds,
  mediaType,
}) => {
  const theme = useMantineTheme();
  const genres = mediaType === 'movie' ? movieGenres : tvGenres;

  const handleCardClick = () => {
    const genreLists = genreIds?.map(id => genres[id].name);

    const data = { id, title, backdropPath, posterPath, overview, genreLists, mediaType };

    setModalState(data);
    open();
  };

  return (
    <div style={{ margin: '0 auto' }}>
      <StyledCard w={252} h={355} radius="md" onClick={handleCardClick}>
        <Image src={`https://image.tmdb.org/t/p/w342${posterPath}` || undefined} />
        <Cover />
        <HoverContainer p={'xl'} w={252}>
          <Flex direction={'column'} align={'baseline'} justify={'space-between'}>
            <Container m={0} p={0} mb={'md'}>
              <Title fw={600}>{title}</Title>
              <Text fz="sm" color="dimmed">
                {originalTitle}
              </Text>
              <Text w={'100%'} mt={'md'} fz="xs" color="dimmed" lineClamp={6}>
                {overview}
              </Text>
            </Container>
            <Footer position="apart">
              <Flex w={'100%'} wrap={'wrap'}>
                {genreIds.map(id => (
                  <Badge color={genres[id].color} key={id}>
                    {genres[id].name}
                  </Badge>
                ))}
                <Text fz="sm" inline>
                  {releaseDate}
                </Text>
              </Flex>
              <Group spacing={8} mr={0}>
                <Action>
                  <IconMovie size="1rem" color={theme.colors.yellow[7]} />
                </Action>
                <Action>
                  <IconHeart size="1rem" color={theme.colors.red[6]} />
                </Action>
                <Action>
                  <IconHistory size="1rem" />
                </Action>
              </Group>
            </Footer>
          </Flex>
        </HoverContainer>
      </StyledCard>
    </div>
  );
};

const Cards = ({ mediaType }) => {
  const { isSuccess, data: content, hasNextPage, fetchNextPage } = useMainBoardQuery(mediaType);
  const [opened, { open, close }] = useDisclosure(false);
  const [modalState, setModalState] = useState({
    id: '',
    type: '',
    title: '',
    backgroundPath: '',
    posterPath: '',
    overview: '',
    genreLists: [],
  });

  const getNextPage = useCallback(() => {
    if (hasNextPage) fetchNextPage();
  }, [hasNextPage, fetchNextPage]);

  const observerRef = useObsever(getNextPage);

  const providers = [
    {
      id: 356,
      provider_name: 'Wavve',
      providerImgPath: 'assets/badges/wavve.svg',
      fee: 7900,
    },
  ];

  return (
    <>
      {opened && <DetailModal opened={opened} close={close} movie={modalState} />}
      <CardGrid
        cols={5}
        w={rem(1324)}
        verticalSpacing="sm"
        breakpoints={[
          { maxWidth: '100rem', cols: 5 },
          { maxWidth: '48rem', cols: 2 },
          { maxWidth: '36rem', cols: 1 },
        ]}>
        {isSuccess && mediaType === 'movie'
          ? content.map(
              ({
                id,
                title,
                original_title: originalTitle,
                poster_path: posterPath,
                backdrop_path: backdropPath,
                genre_ids: genreIds,
                overview,
                release_date: releaseDate,
              }) => (
                <ArticleCard
                  open={open}
                  setModalState={setModalState}
                  key={id}
                  id={id}
                  title={title}
                  originalTitle={originalTitle}
                  posterPath={posterPath}
                  backdropPath={backdropPath}
                  genreIds={genreIds}
                  overview={overview}
                  release_date={releaseDate}
                  mediaType={mediaType}
                />
              )
            )
          : content.map(
              ({
                id,
                name,
                original_name: originalName,
                poster_path: posterPath,
                backdrop_path: backdropPath,
                genre_ids: genreIds,
                overview,
                first_air_date: firstAirDate,
              }) => (
                <ArticleCard
                  open={open}
                  setModalState={setModalState}
                  key={id}
                  id={id}
                  title={name}
                  originalTitle={originalName}
                  posterPath={posterPath}
                  backdropPath={backdropPath}
                  genreIds={genreIds}
                  overview={overview}
                  release_date={firstAirDate}
                  mediaType={mediaType}
                />
              )
            )}
      </CardGrid>
      <ScrollObserver hasNextPage={hasNextPage} observer={observerRef} />
    </>
  );
};
export default Cards;
