import { useRecoilState, useSetRecoilState } from 'recoil';
import { useProviderQueries, useUserQuery } from './queries';
import PROVIDERS from '../constants/providers';
import { statisticByProviderState } from '../recoil/atom';

const useStatistics = () => {
  const setStatisticData = useSetRecoilState(statisticByProviderState);
  const { data } = useUserQuery({ select: userInfo => userInfo.history_list });
  const historyList = data || [];
  const total = historyList.length;

  setStatisticData(state => ({ ...state, total }));
};

export default useStatistics;
