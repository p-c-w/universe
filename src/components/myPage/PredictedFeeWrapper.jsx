import { Suspense } from 'react';
import { useUserQuery } from '../../hooks/queries';
import PredictedSubscription from './PredictedSubscription';

const PredictedFeeWrapper = () => {
  const { data, isSuccess } = useUserQuery({
    select: userInfo => ({
      watchlist: userInfo.watch_list,
    }),
  });

  const { watchlist } = data || {
    watchlist: [],
  };

  const userCollectionList = watchlist.map(list => ({ type: list.type, id: list.id }));

  return (
    <Suspense>
      {isSuccess && <PredictedSubscription watchlist={watchlist} userCollectionList={userCollectionList} />}
    </Suspense>
  );
};

export default PredictedFeeWrapper;
