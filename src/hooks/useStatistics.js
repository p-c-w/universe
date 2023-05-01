import { useRecoilState, useSetRecoilState } from 'recoil';
import { statisticByProviderState } from '../recoil/atom';

const useStatistics = () => {
  const setStatisticData = useSetRecoilState(statisticByProviderState);
};

export default useStatistics;
