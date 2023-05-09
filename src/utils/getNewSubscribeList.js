import { getProviderArray } from './index';

const getNewSubscribeList = selectedNames => {
  const newProviderNames = selectedNames.map(name => getProviderArray().find(item => item.provider_name === name));
  const newList = newProviderNames.map(provider => ({ id: provider.id, price: 'basic' }));

  return newList;
};

export default getNewSubscribeList;
