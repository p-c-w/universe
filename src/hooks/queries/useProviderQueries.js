import { useQueries } from '@tanstack/react-query';
import { fetchProvider } from '../../api';
// import { PROVIDERS } from '../../constants';
import PROVIDERS from '../../constants/providers';

const useProviderQueries = (list, options) => {
  const providerQueries = list?.map(({ type, id }) => ({
    queryKey: ['@provider', type, id],
    queryFn: () => fetchProvider(type, id),
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
      ?.filter(id => Object.prototype.hasOwnProperty.call(PROVIDERS, id)),
  }));

  return { queries, providerDatas, providers };
};

export default useProviderQueries;
