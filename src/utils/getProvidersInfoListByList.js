import { PROVIDERS } from '../constants';

const getProvidersInfoListByList = list => list?.map(item => PROVIDERS.find(PROVIDER => PROVIDER.id === item.id));

export default getProvidersInfoListByList;
