import ReactApexChart from 'react-apexcharts';
import { Paper, Title, Flex } from '@mantine/core';

const StatsByMonthly = () => {
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
      },
    ],
  };

  return (
    <Paper withBorder p={40} pt="sm" radius="md" h="100%">
      <Flex direction="column" justify="center" h="100%">
        <Title order={3} align="left">
          Universe 분석
        </Title>

        <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={250} />
      </Flex>
    </Paper>
  );
};

export default StatsByMonthly;
