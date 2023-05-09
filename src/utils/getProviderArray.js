import { PROVIDERS } from '../constants';

const getProviderArray = () => Object.entries(PROVIDERS).map(entry => ({ id: +entry[0], ...entry[1] }));

export default getProviderArray;
