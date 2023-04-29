// import { PROVIDERS } from '../constants';
import PROVIDERS from '../constants/providers';

const getProvidersInfoListByList = list =>
  list?.map(({ id, price }) => ({
    id,
    provider_name: PROVIDERS[id].provider_name,
    providerImgPath: PROVIDERS[id].provider_name,
    fee: PROVIDERS[id].fee[price],
  }));

export default getProvidersInfoListByList;
