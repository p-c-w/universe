import React from 'react';

import { Modal, Image, Grid, Container, Title, Text } from '@mantine/core';
import styled from '@emotion/styled';
import Badges from '../../Badges';
import CollectionButtons from '../../CollectionButtons';

const ImageContainer = styled.div`
  position: relative;
`;

const BadgeContainer = styled.div`
  width: 100%;
  padding: 0 1.875rem;
  display: flex;
  position: absolute;
  justify-content: space-between;
  bottom: 1rem;
  z-index: 999;
`;

const DetailModal = ({ opened, close, providers, movie: { title, background, description, genres } }) => (
  <>
    <Modal.Root opened={opened} onClose={close} size={850} centered>
      <Modal.Overlay />
      <Modal.Content style={{ position: 'relative' }}>
        <ImageContainer>
          <Image src={`https://image.tmdb.org/t/p/w780/${background}.jpg` || undefined} />
          <BadgeContainer>
            <Badges providers={providers} spacing="sm" size="2.5rem" />
            <CollectionButtons size={35} />
          </BadgeContainer>
        </ImageContainer>
        <Modal.CloseButton style={{ position: 'absolute', top: 10, right: 10 }} />
        <Modal.Body>
          <Grid columns={5}>
            <Grid.Col span={2}>
              <Container m={20}>
                <Title order={2}>{title}</Title>
                <Text>2023</Text>
                <Text fw={300} fz="md">
                  장르: {genres.map(genre => genre).join(', ')}
                </Text>
              </Container>
            </Grid.Col>
            <Grid.Col span={3}>
              <Container m={30}>
                <Text fw={300} fz="md" lineClamp={3}>
                  {description}
                </Text>
              </Container>
            </Grid.Col>
          </Grid>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  </>
);
export default DetailModal;
