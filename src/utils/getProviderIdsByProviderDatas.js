import { PROVIDERS } from '../constants';

const getProviderIdsByProviderDatas = providerDatas => {
  const providers = providerDatas.map(data => ({
    ...data,
    providers: data.providers
      ?.map(provider => provider.provider_id)
      ?.filter(id => Object.prototype.hasOwnProperty.call(PROVIDERS, id)),
  }));

  return providers;
};

export default getProviderIdsByProviderDatas;
