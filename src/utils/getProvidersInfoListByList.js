import { PROVIDERS } from '../constants';

const getProvidersInfoListByList = list =>
  list?.map(({ id, price }) => ({
    id,
    provider_name: PROVIDERS[id].provider_name,
    providerImgPath: PROVIDERS[id].providerImgPath,
    fee: PROVIDERS[id].fee[price],
  }));

export default getProvidersInfoListByList;
