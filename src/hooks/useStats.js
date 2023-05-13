import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

const useStats = (statState, useStatsDataFn) => {
  const setStatsState = useSetRecoilState(statState);
  const newState = useStatsDataFn();

  useEffect(() => {
    if (newState) {
      setStatsState(newState);
    }
  }, [newState]);
};

export default useStats;
