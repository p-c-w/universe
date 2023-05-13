import { useEffect } from 'react';
import styled from '@emotion/styled';
import { Carousel } from '@mantine/carousel';
import { useSetRecoilState } from 'recoil';
import { statsByProviderState, statsByMonthlyState, statsByGenreState } from '../../recoil/atom';
import { StatsByMonthly, StatsByProvider, StatcsByGenre, StatsWrapper } from '.';
import { useStatsByProvider, useStatsByMonthly, useStatsByGenre } from '../../hooks';

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
  const setGenreStats = useSetRecoilState(statsByGenreState);

  const newProviderStats = useStatsByProvider();
  const newMonthlyStats = useStatsByMonthly();
  const newGenreStats = useStatsByGenre();

  useEffect(() => {
    if (newProviderStats) {
      setStatisticData({ total: newProviderStats.newTotal, data: newProviderStats.newData });
    }
  }, [newProviderStats, setStatisticData]);

  useEffect(() => {
    if (newMonthlyStats) {
      setMonthlyStats(newMonthlyStats);
    }
  }, [newMonthlyStats, setMonthlyStats]);

  useEffect(() => {
    if (newGenreStats) {
      setGenreStats({ total: newGenreStats.newTotal, data: newGenreStats.newData });
    }
  }, [newGenreStats, setGenreStats]);

  const statsComponents = [<StatsByProvider key={0} />, <StatsByMonthly key={1} />, <StatcsByGenre key={2} />];

  return (
    <StatisticCarousel height="100%" loop withIndicators controlsOffset="xs" controlSize={20}>
      {statsComponents.map((component, i) => (
        <Carousel.Slide key={i}>
          <StatsWrapper stats={component} />
        </Carousel.Slide>
      ))}
    </StatisticCarousel>
  );
};

export default Statistics;
