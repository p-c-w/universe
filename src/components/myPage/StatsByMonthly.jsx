import ReactApexChart from 'react-apexcharts';
import { useRecoilValue } from 'recoil';
import { statsByMonthlyState } from '../../recoil/atom';

const StatsByMonthly = () => {
  const monthlyData = useRecoilValue(statsByMonthlyState);

  const chartData = {
    options: {
      chart: {
        id: 'monthly-line',
        type: 'line',
        toolbar: {
          show: false,
        },
      },
      colors: ['#A17FFB'],
      grid: {
        borderColor: 'transparent',
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        title: {
          text: 'Month',
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      },
      stroke: {
        curve: 'smooth',
        lineCap: 'butt',
        width: 3,
      },
    },
    series: [
      {
        name: 'series-monthly',
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
