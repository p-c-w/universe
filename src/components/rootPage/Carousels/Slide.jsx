import { Carousel } from '@mantine/carousel';
import { Card, Image, Container, Text } from '@mantine/core';
import { Suspense, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import MoreButton from '../common/MoreButton';
import { DetailModalWrapper, ModalSkeleton } from '../common';

const Slide = ({ id, title, originalTitle, backdropPath, mediaType }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <Carousel.Slide py="lg" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <Card mw={342} p={0} radius="md" shadow="sm">
          <Image
            src={
              backdropPath ? `https://image.tmdb.org/t/p/w500${backdropPath}` : 'https://placehold.co/500x281?text=TBD'
            }
          />
          <Container h={60} m="sm">
            <Text fw={800} fz="lg" lineClamp={1}>
              {title}
            </Text>
            <Text fz="xs" lineClamp={1}>
              {originalTitle}
            </Text>
          </Container>
        </Card>
        {isHovered && <MoreButton open={open} pos={'absolute'} right={'20px'} top={'20px'} />}
      </Carousel.Slide>
      {opened && (
        <Suspense fallback={<ModalSkeleton />}>
          <DetailModalWrapper opened={opened} close={close} id={id} type={mediaType} />
        </Suspense>
      )}
    </>
  );
};

export default Slide;
