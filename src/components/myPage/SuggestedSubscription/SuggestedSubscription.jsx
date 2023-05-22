import { Suspense } from 'react';
import { useUserQuery } from '../../../hooks/queries';
import { Content } from '.';

const SuggestedSubscription = () => {
  const { data, isSuccess } = useUserQuery({
    select: userInfo => ({
      watchlist: userInfo.watch_list,
      refetchOnWindowFocus: false,
    }),
  });

  const { watchlist } = data || {
    watchlist: [],
  };

  const userCollectionList = watchlist.map(list => ({ type: list.type, id: list.id }));

  return (
    <Suspense fallback={<div>isLoading..</div>}>
      {isSuccess && <Content watchlist={watchlist} userCollectionList={userCollectionList} />}
    </Suspense>
  );
};

export default SuggestedSubscription;
