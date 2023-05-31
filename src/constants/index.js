export { default as PROVIDERS } from './providers';
export { default as COLORS } from './colors';
export { default as GENRES } from './genres';

export {
  tmdbUrl as TMDB_URL,
  tmdbImgUrl as TMDB_IMG_URL,
  tmdbApiUrl as TMDB_API_URL,
  placeholderUrl as PLACEHOLDER_IMG_URL,
  pcwRepoUrl as PCW_REPO_URL,
} from './urls';

export {
  buttonStartY as BUTTON_START_Y,
  scrollDelay as SCROLL_DELAY,
  sideNavDuration as SIDE_NAV_DURATION,
  autoPlayDelay as AUTO_PLAY_DELAY,
} from './durations';

export { collectionButton as COLLECTION_BUTTON, collectionPageLimit as PAGE_LIMIT } from './collectionItems';

export {
  userInfoQueryKey as USER_INFO_QUERY_KEY,
  userContentQueryKey as USER_CONTENT_QUERY_KEY,
  isAuthenticatedQueryKey as IS_AUTHENTICATED_QUERY_KEY,
  searchResultQueryKey as SEARCH_RESULT_QUERY_KEY,
  collectionQueryKey as COLLECTION_QUERY_KEY,
  contentDetailQueryKey as CONTENT_DETAIL_QUERY_KEY,
  providerQueryKey as PROVIDER_QUERY_KEY,
} from './userQueryKeys';

export {
  categoryStateKey as CATEGORY_STATE_KEY,
  isLoginStateKey as IS_LOGIN_STATE_KEY,
  selectedItemStateKey as SELECTED_ITEM_STATE_KEY,
  sideNavStateKey as SIDE_NAV_STATE_KEY,
  userStateKey as USER_STATE_KEY,
} from './recoilKeys';
