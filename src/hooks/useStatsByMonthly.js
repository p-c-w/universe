import { useUserQuery } from './queries';

const useStatsByMonthly = () => {
  const { data } = useUserQuery({ select: userInfo => userInfo.history_list.map(item => new Date(item.modified_at)) });
  const historyDates = data || [];
};

export default useStatsByMonthly;
