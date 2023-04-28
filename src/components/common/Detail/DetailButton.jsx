import React from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Button, Group } from '@mantine/core';
import DetailModal from './DetailModal';

const providers = [
  {
    id: 356,
    provider_name: 'Wavve',
    providerImgPath: 'assets/badges/wavve.svg',
    fee: 7900,
  },
];

const movie = {
  title: '모범택시',
  backgroundPath: 'qrlfF3usm2FZCMvCg2uas8CazxW',
  overview:
    '정의가 실종된 사회, 전화 한 통이면 오케이” 베일에 가려진 택시회사 무지개 운수와 택시기사 김도기가 억울한 피해자를 대신해 복수를 완성하는 사적 복수 대행극',
  genreIds: ['액션', '범죄', '드라마'],
};

const DetailButton = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <DetailModal opened={opened} close={close} providers={providers} movie={movie} />
      <Group position="center">
        <Button onClick={open}>Open modal</Button>
      </Group>
    </>
  );
};

export default DetailButton;
