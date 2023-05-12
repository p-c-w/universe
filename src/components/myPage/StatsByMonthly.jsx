import ReactApexChart from 'react-apexcharts';
import { useRecoilValue } from 'recoil';
import { statsByMonthlyState } from '../../recoil/atom';

const StatsByMonthly = () => {
  const monthlyData = useRecoilValue(statsByMonthlyState);

  const chartData = {
    options: {
      chart: {
        id: 'basic-line',
        toolbar: {
          show: false,
        },
      },
      grid: {
        borderColor: 'transparent',
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
    },
    series: [
      {
        name: 'series-1',
        data: monthlyData,
      },
    ],
  };

  return (
    <>
      <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={250} />
    </>
  );
};

export default StatsByMonthly;
