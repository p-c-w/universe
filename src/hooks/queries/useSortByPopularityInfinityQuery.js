import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchSortByPopularity } from '../../api/tmdb';

const staleTime = 1000 * 60 * 5;

const useSortByPopularityInfinityQuery = mediaType => {
  const { data, isSuccess, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: [`@${mediaType}`],
    queryFn: ({ pageParam = 1 }) => fetchSortByPopularity(mediaType, pageParam),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.pages !== lastPage.total_pages ? allPages.length + 1 : undefined,
    staleTime,
    suspense: true,
    select: datas => datas.pages.map(data => data.results).flat(),
  });

  return { data, isSuccess, hasNextPage, fetchNextPage };
};

export default useSortByPopularityInfinityQuery;
