import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchSortByPopularity } from '../../api/tmdb';

const useSortByPopularityInfinityQuery = mediaType => {
  const { data, isSuccess, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: [`@${mediaType}`],
    suspense: true,
    staleTime: 1000 * 60 * 5,
    queryFn: ({ pageParam = 1 }) => fetchSortByPopularity(mediaType, pageParam),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.pages !== lastPage.total_pages ? allPages.length + 1 : undefined,
    select: datas => datas.pages.map(data => data.results).flat(),
  });

  return { data, isSuccess, hasNextPage, fetchNextPage };
};

export default useSortByPopularityInfinityQuery;
