import { PROVIDERS } from '../constants';

const getProvidersByIds = Ids =>
  Ids?.map(id => ({
    id,
    provider_name: PROVIDERS[id].provider_name,
    providerImgPath: PROVIDERS[id].providerImgPath,
    fee: PROVIDERS[id].fee,
  }));

export default getProvidersByIds;
