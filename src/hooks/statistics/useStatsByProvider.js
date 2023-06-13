import { useMemo } from 'react';
import { useProviderQueries, useUserQuery } from '../queries';
import { COLORS } from '../../constants';

const defaultData = {
  total: '0',
  data: [
    {
      id: 8,
      label: 'Netflix',
      count: 0,
      part: 0,
      color: COLORS.Netflix,
    },
    {
      id: 97,
      label: 'Watcha',
      count: 0,
      part: 0,
      color: COLORS.Watcha,
    },
    {
      id: 119,
      label: 'Amazon Prime',
      count: 0,
      part: 0,
      color: COLORS['Amazon Prime Video'],
    },
    {
      id: 337,
      label: 'Disney+',
      count: 0,
      part: 0,
      color: COLORS['Disney Plus'],
    },
    {
      id: 350,
      label: 'Apple TV+',
      count: 0,
      part: 0,
      color: COLORS['Apple TV Plus'],
    },
    {
      id: 356,
      label: 'Wavve',
      count: 0,
      part: 0,
      color: COLORS.Wavve,
    },
  ],
};

const getCountByProvider = (providerId, providerIds) => providerIds?.filter(Id => Id === providerId).length;

const getNewData = (providers, newTotal) => {
  const newData = defaultData.data
    .map(item => ({ ...item, count: getCountByProvider(item.id, providers) }))
    .map(item => ({ ...item, part: item.count === 0 ? 0 : +((item.count / newTotal) * 100).toFixed() }));
  return newData;
};

const useStatisticsByProvider = () => {
  const { data: historyList } = useUserQuery({ select: userInfo => userInfo.history_list });
  const newTotal = historyList.length;

  const { queries } = useProviderQueries(historyList, {
    enabled: !!newTotal,
  });

  const providers = queries.map(({ data }) => (data?.providers !== undefined ? data.providers[0] : []));

  const newData = useMemo(() => getNewData(providers, newTotal), [providers, newTotal]);

  const newStats = { total: newTotal, data: newData };

  return newStats;
};

export default useStatisticsByProvider;
