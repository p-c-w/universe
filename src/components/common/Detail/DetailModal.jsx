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

const DetailModal = ({ opened, close }) => (
  <>
    <Modal.Root opened={opened} onClose={close} size={850} centered>
      <Modal.Overlay />
      <Modal.Content style={{ position: 'relative' }}>
        <ImageContainer>
          <Image src={`https://image.tmdb.org/t/p/w780/qrlfF3usm2FZCMvCg2uas8CazxW.jpg` || undefined} />
          <BadgeContainer>
            <Badges
              providers={[
                {
                  id: 356,
                  provider_name: 'Wavve',
                  providerImgPath: 'assets/badges/wavve.svg',
                  fee: 7900,
                },
              ]}
              spacing="sm"
              size="2.5rem"
            />
            <CollectionButtons size={35} />
          </BadgeContainer>
        </ImageContainer>
        <Modal.CloseButton style={{ position: 'absolute', top: 10, right: 10 }} />
        <Modal.Body>
          <Grid columns={5}>
            <Grid.Col span={2}>
              <Container m={20}>
                <Title order={2}>모범택시</Title>
                <Text>2023</Text>
                <Text fw={300} fz="md">
                  장르: 액션, 범죄, 드라마
                </Text>
              </Container>
            </Grid.Col>
            <Grid.Col span={3}>
              <Container m={30}>
                <Text fw={300} fz="md" lineClamp={3}>
                  정의가 실종된 사회, 전화 한 통이면 오케이” 베일에 가려진 택시회사 무지개 운수와 택시기사 김도기가
                  억울한 피해자를 대신해 복수를 완성하는 사적 복수 대행극
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
