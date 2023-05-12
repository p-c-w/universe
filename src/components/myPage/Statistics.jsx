import { useEffect } from 'react';
import styled from '@emotion/styled';
import { Carousel } from '@mantine/carousel';
import { useSetRecoilState } from 'recoil';
import { statsByProviderState, statsByMonthlyState } from '../../recoil/atom';
import { StatsByMonthly, StatsByProvider, StatsWrapper } from '.';
import { useStatsByProvider, useStatsByMonthly } from '../../hooks';

const StatisticCarousel = styled(Carousel)`
  text-align: center;
  & .mantine-Carousel-indicator {
    background-color: gray;
    width: 0.75rem;
    height: 0.25rem;
    transition: width 250ms ease;

    &[data-active] {
      width: 2.5rem;
    }
  }
`;

const Statistics = () => {
  const setStatisticData = useSetRecoilState(statsByProviderState);
  const setMonthlyStats = useSetRecoilState(statsByMonthlyState);

  const newState = useStatsByProvider();
  const newMonthlyStats = useStatsByMonthly();

  useEffect(() => {
    if (newState) {
      setStatisticData({ total: newState.newTotal, data: newState.newData });
    }
  }, [newState, setStatisticData]);

  useEffect(() => {
    if (newMonthlyStats) {
      setMonthlyStats(newMonthlyStats);
    }
  }, [newMonthlyStats, setMonthlyStats]);

  return (
    <StatisticCarousel height="100%" loop withIndicators controlsOffset="xs" controlSize={20}>
      <Carousel.Slide>
        <StatsWrapper stats={<StatsByProvider />} />
      </Carousel.Slide>
      <Carousel.Slide>
        <StatsWrapper stats={<StatsByMonthly />} />
      </Carousel.Slide>
      <Carousel.Slide>
        <StatsWrapper stats={<>장르별 통계</>} />
      </Carousel.Slide>
    </StatisticCarousel>
  );
};

export default Statistics;
