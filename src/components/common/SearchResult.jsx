import { useSearchResultQueries } from '../../hooks/queries';

const mediaType = ['movie', 'tv'];

const SearchResult = ({ input }) => {
  const searchResults = useSearchResultQueries(mediaType, input);

  console.log(searchResults);

  return (
    <div
      style={{
        position: 'absolute',
        backgroundColor: '#fff',
        left: '0',
        width: '31.25rem',
        borderRadius: 'var(--mantine-radius-lg)',
      }}>
      {searchResults.map((searchResult, idx) =>
        searchResult.map(({ id, title, name }) => <div key={id}>{`${mediaType[idx]} ${title || name}`}</div>)
      )}
    </div>
  );
};

export default SearchResult;
