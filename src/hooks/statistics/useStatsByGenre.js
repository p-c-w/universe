import { useUserQuery, useCollectionQueries } from '../queries';
import { GENRES } from '../../constants';

const defaultData = {
  total: '0',
  data: [
    {
      id: [10759, 28, 12],
      label: '액션 & 모험',
      count: 0,
      part: 0,
      color: `${GENRES.tv[10759].color}`,
    },
    {
      id: [16],
      label: '애니메이션',
      count: 0,
      part: 0,
      color: `${GENRES.tv[16].color}`,
    },
    {
      id: [35],
      label: '코미디',
      count: 0,
      part: 0,
      color: `${GENRES.tv[35].color}`,
    },
    {
      id: [80],
      label: '범죄',
      count: 0,
      part: 0,
      color: `${GENRES.tv[80].color}`,
    },
    {
      id: [99],
      label: '다큐멘터리',
      count: 0,
      part: 0,
      color: `${GENRES.tv[99].color}`,
    },
    {
      id: [18],
      label: '드라마',
      count: 0,
      part: 0,
      color: `${GENRES.tv[18].color}`,
    },
    {
      id: [10751],
      label: '가족',
      count: 0,
      part: 0,
      color: `${GENRES.tv[10751].color}`,
    },
    {
      id: [36],
      label: '역사',
      count: 0,
      part: 0,
      color: `${GENRES.movie[36].color}`,
    },
    {
      id: [27],
      label: '공포',
      count: 0,
      part: 0,
      color: `${GENRES.movie[27].color}`,
    },
    {
      id: [10402],
      label: '음악',
      count: 0,
      part: 0,
      color: `${GENRES.movie[10402].color}`,
    },
    {
      id: [10749],
      label: '로맨스',
      count: 0,
      part: 0,
      color: `${GENRES.movie[10749].color}`,
    },
    {
      id: [53],
      label: '스릴러',
      count: 0,
      part: 0,
      color: `${GENRES.movie[53].color}`,
    },
    {
      id: [10752],
      label: '전쟁',
      count: 0,
      part: 0,
      color: `${GENRES.movie[10752].color}`,
    },
    {
      id: [10762],
      label: '키즈',
      count: 0,
      part: 0,
      color: `${GENRES.tv[10762].color}`,
    },
    {
      id: [9648],
      label: '미스터리',
      count: 0,
      part: 0,
      color: `${GENRES.tv[9648].color}`,
    },
    {
      id: [10763],
      label: '뉴스',
      count: 0,
      part: 0,
      color: `${GENRES.tv[10763].color}`,
    },
    {
      id: [10764],
      label: '리얼리티',
      count: 0,
      part: 0,
      color: `${GENRES.tv[10764].color}`,
    },
    {
      id: [10765, 14, 878],
      label: 'SF&판타지',
      count: 0,
      part: 0,
      color: `${GENRES.tv[10765].color}`,
    },
    {
      id: [10766],
      label: '소프',
      count: 0,
      part: 0,
      color: `${GENRES.tv[10766].color}`,
    },
    {
      id: [10767],
      label: '토크',
      count: 0,
      part: 0,
      color: `${GENRES.tv[10767].color}`,
    },
    {
      id: [10768],
      label: '전쟁&정치',
      count: 0,
      part: 0,
      color: `${GENRES.tv[10768].color}`,
    },
    {
      id: [10770],
      label: 'TV 영화',
      count: 0,
      part: 0,
      color: `${GENRES.tv[10770].color}`,
    },
    {
      id: [37],
      label: '서부',
      count: 0,
      part: 0,
      color: `${GENRES.tv[37].color}`,
    },
  ],
};

const getCountByGenre = (genreId, genreIds) => genreIds?.filter(Id => genreId.includes(Id)).length;

const getNewData = (genres, newTotal) => {
  const genreIds = genres.flatMap(Ids => Ids.id);

  const newData = defaultData.data
    .map(item => ({ ...item, count: getCountByGenre(item.id, genreIds) }))
    .map(item => ({ ...item, part: +((item.count / newTotal) * 100).toFixed() }));
  return newData;
};

const useStatsByGenre = () => {
  const { data } = useUserQuery({ select: userInfo => userInfo.history_list });
  const historyList = data || [];
  const newTotal = historyList.length;

  let newData = [];

  const { queries: collectionQueries } = useCollectionQueries(historyList);

  const genres = collectionQueries.map(({ isSuccess, data }) => isSuccess && data.genres[0]);

  if (genres[0]) {
    newData = getNewData(genres, newTotal);
  }

  const newStats = { total: newTotal, data: newData };

  return newStats;
};

export default useStatsByGenre;
