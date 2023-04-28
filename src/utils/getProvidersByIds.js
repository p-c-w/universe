import { PROVIDERS } from '../constants';

const getProvidersByIds = Ids => Ids?.map(Id => PROVIDERS.find(PROVIDER => PROVIDER.id === Id));
export default getProvidersByIds;
