import { useMemo } from 'react';
import { useUserQuery } from '../queries';

const thisYear = new Date().getFullYear();

const useStatsByMonthly = () => {
  const { data: historyDates } = useUserQuery({
    select: userInfo => userInfo.history_list.map(item => new Date(item.modified_at)),
  });

  const getNewData = dates => {
    const monthlyData = Array.from({ length: 12 }, () => 0);

    dates.forEach(date => {
      if (date.getFullYear() === thisYear) {
        monthlyData[date.getMonth()] += 1;
      }
    });
    return monthlyData;
  };

  const newData = useMemo(() => getNewData(historyDates), [historyDates]);

  return newData;
};

export default useStatsByMonthly;
