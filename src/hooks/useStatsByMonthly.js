import { useUserQuery } from './queries';

const thisYear = new Date().getFullYear();

const useStatsByMonthly = () => {
  const monthlyData = Array.from({ length: 12 }, () => 0);

  const { data } = useUserQuery({ select: userInfo => userInfo.history_list.map(item => new Date(item.modified_at)) });
  const historyDates = data || [];

  historyDates.forEach(data => {
    if (data.getFullYear() === thisYear) {
      monthlyData[data.getMonth()] += 1;
    }
  });

  return monthlyData;
};

export default useStatsByMonthly;
