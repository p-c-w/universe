import { PROVIDERS } from '../constants';

const calculateLowestFee = movies => {
  const domesticProviders = Object.keys(PROVIDERS).map(id => +id);
  const movieProviders = {};
  const selectedProviders = new Set();

  const updatedMovies = movies.map(movie => ({
    ...movie,
    providers: movie.providers.filter(providerId => domesticProviders.includes(providerId)),
  }));

  updatedMovies.forEach(movie => {
    movie.providers.forEach(provider => {
      movieProviders[provider] = (movieProviders[provider] || 0) + 1;
    });
  });

  let remainingMovies = [...updatedMovies];

  const getNewCount = provider => remainingMovies.filter(movie => movie.providers.includes(Number(provider))).length;

  while (remainingMovies.length > 0) {
    let maxCount = 0;
    let selectedProvider = null;

    Object.keys(movieProviders).forEach(provider => {
      if (movieProviders[provider] > maxCount) {
        maxCount = movieProviders[provider];
        selectedProvider = provider;
      }
    });

    selectedProviders.add(Number(selectedProvider));
    remainingMovies = remainingMovies.filter(movie => !movie.providers.includes(Number(selectedProvider)));

    Object.keys(movieProviders).forEach(provider => {
      if (provider === selectedProvider) {
        delete movieProviders[provider];
      } else {
        movieProviders[provider] = getNewCount(provider);
      }
    });
  }

  const totalPrice = Array.from(selectedProviders).reduce((sum, provider) => sum + PROVIDERS[provider].fee.basic, 0);

  return {
    cheapestPrice: totalPrice,
    cheapestCombo: Array.from(selectedProviders),
  };
};

export default calculateLowestFee;
