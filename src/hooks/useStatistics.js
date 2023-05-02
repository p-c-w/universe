import { useProviderQueries, useUserQuery } from './queries';
import PROVIDERS from '../constants/providers';

const defaultData = {
  total: '0',
  data: [
    {
      id: 8,
      label: 'Netflix',
      count: 0,
      part: 0,
      color: `${PROVIDERS[8].color}`,
    },
    {
      id: 97,
      label: 'Watcha',
      count: 0,
      part: 0,
      color: `${PROVIDERS[97].color}`,
    },
    {
      id: 119,
      label: 'Amazon Prime',
      count: 0,
      part: 0,
      color: `${PROVIDERS[119].color}`,
    },
    {
      id: 337,
      label: 'Disney+',
      count: 0,
      part: 0,
      color: `${PROVIDERS[337].color}`,
    },
    {
      id: 350,
      label: 'Apple TV+',
      count: 0,
      part: 0,
      color: `${PROVIDERS[350].color}`,
    },
    {
      id: 356,
      label: 'Wavve',
      count: 0,
      part: 0,
      color: `${PROVIDERS[356].color}`,
    },
  ],
};

const useStatistics = () => {
  const { data } = useUserQuery({ select: userInfo => userInfo.history_list });

  const historyList = data || [];
  const newtotal = historyList.length;
  let newData = [];

  const queries = useProviderQueries(historyList, {
    select: data => ({
      id: data.id,
      providers: data.results.KR.flatrate
        ?.map(provider => provider.provider_id)
        ?.filter(id => Object.prototype.hasOwnProperty.call(PROVIDERS, id)),
    }),
    enabled: !!newtotal,
  });

  const getCountByProvider = (providerId, providerIds) => providerIds?.filter(Id => Id === providerId).length;
  const providers = queries.map(({ isSuccess, data }) => isSuccess && data);
  if (providers[0]) {
    const providerIds = providers.flatMap(Ids => Ids.providers);

    newData = defaultData.data.map(item => ({ ...item, count: getCountByProvider(item.id, providerIds) }));
    newData = newData.map(item => ({ ...item, part: item.count / newtotal }));
  }
  return { newtotal, newData };
};

export default useStatistics;
