import { useQueries } from '@tanstack/react-query';
import { fetchProvider } from '../../api';
import { PROVIDERS } from '../../constants';

const useProviderQueries = (list, options) => {
  const providerQueries = list?.map(item => ({
    queryKey: ['@provider', item],
    queryFn: () => fetchProvider(item.type, item.id),
    suspense: true,
    ...options,
  }));

  const queries = useQueries({
    queries: providerQueries,
  });

  const providerDatas = queries.map(query => query.data);

  const providers = providerDatas.map(data => ({
    ...data,
    providers: data.providers
      ?.map(provider => provider.provider_id)
      ?.filter(id => PROVIDERS.find(PROVIDER => PROVIDER.id === id)),
  }));

  return { queries, providerDatas, providers };
};

export default useProviderQueries;
