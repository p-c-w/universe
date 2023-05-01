import { PRICE } from '../constants';

const allCombos = ott => {
  if (ott.length === 0) {
    return [[]];
  }

  const combinationsWithoutFirst = allCombos(ott.slice(1));
  const combinationsWithFirst = combinationsWithoutFirst.map(combination => [ott[0], ...combination]);

  return [...combinationsWithoutFirst, ...combinationsWithFirst];
};

const calculateLowestFee = movies => {
  const providers = Object.keys(PRICE).map(id => +id);

  const ottCombinations = allCombos(providers);

  const validCombos = ottCombinations.filter(combo =>
    movies.every(movie => movie.providers.some(provider => combo.includes(provider)))
  );

  const prices = validCombos.map(combo => combo.reduce((total, provider) => total + PRICE[provider].basic, 0));

  const cheapestPrice = Math.min(...prices);
  const cheapestCombo = [validCombos[prices.indexOf(cheapestPrice)]?.join(', ')].map(id => ({
    id: +id,
    // provider_name: PRICE[id].name,
    provider_name: 'Netflix',
    // providerImgPath: PRICE[id].path,
    // providerImgPath: PRICE[id].path,
  }));

  return { cheapestCombo, cheapestPrice };
};

export default calculateLowestFee;
