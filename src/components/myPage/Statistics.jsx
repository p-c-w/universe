import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Carousel } from '@mantine/carousel';
import { useSetRecoilState } from 'recoil';
import { statsByMonthlyState, statsByGenreState, statsByProviderState } from '../../recoil/atom';
import { StatsByMonthly, StatsByProvider, StatcsByGenre, StatsWrapper } from '.';
import { useStatsByProvider, useStatsByMonthly, useStatsByGenre, useStats } from '../../hooks';

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
  useStats(statsByProviderState, useStatsByProvider);
  useStats(statsByMonthlyState, useStatsByMonthly);

  const setGenreStats = useSetRecoilState(statsByGenreState);

  const newGenreStats = useStatsByGenre();

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
