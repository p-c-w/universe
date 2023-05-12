import ReactApexChart from 'react-apexcharts';
import { useRecoilValue } from 'recoil';
import { Text, Group, useMantineColorScheme } from '@mantine/core';
import { IconDeviceAnalytics } from '@tabler/icons-react';
import styled from '@emotion/styled';
import { statsByMonthlyState } from '../../recoil/atom';

const Icon = styled(IconDeviceAnalytics)`
  color: ${({ theme }) => (theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4])};
`;

const StatsByMonthly = () => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const monthlyData = useRecoilValue(statsByMonthlyState);
  const total = monthlyData.reduce((acc, cur) => acc + cur, 0);

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
      <Group position="apart" mt={7}>
        <Group align="flex-end" spacing="xs">
          <Text fz="lg" fw={700} align="left">
            올해는 총{' '}
            <Text fw={900} c={dark ? 'violet.2' : 'violet.9'} span>
              {total}
            </Text>
            건의 컨텐츠를 감상했어요.
          </Text>
        </Group>
        <Icon size="1.4rem" stroke={1.5} />
      </Group>

      <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={250} />
    </>
  );
};

export default StatsByMonthly;
