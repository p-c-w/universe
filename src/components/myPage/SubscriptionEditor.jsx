import { useState } from 'react';
import { Chip, Flex, Title, ActionIcon } from '@mantine/core';
import { IconSquareCheck } from '@tabler/icons-react';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
// import { PROVIDERS } from '../../constants';
import PROVIDERS from '../../constants/providers';
import { userState } from '../../recoil/atom';
import { useUpdateSubscriptionMutation } from '../../hooks/mutations';

const providerArray = Object.entries(PROVIDERS).map(entry => ({ id: +entry[0], ...entry[1] }));

const getNewSubscribeList = selectedNames => {
  const newProviderNames = selectedNames.map(name => providerArray.find(item => item.provider_name === name));
  const newList = newProviderNames.map(provider => ({ id: provider.id, price: 'basic' }));

  return newList;
};

const SubscriptionEditor = ({ providers, onClick }) => {
  const providersNames = providers?.map(provider => provider.provider_name);

  const { mutate: updateSubscribeList } = useUpdateSubscriptionMutation();
  const [selectedProviders, setSelectedProviders] = useState(providersNames);
  const email = useRecoilValue(userState);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();

    updateSubscribeList({ email, newList: getNewSubscribeList(selectedProviders) });
    onClick();
  };

  const toggleAllSelectedProviders = () => {
    if (selectedProviders.length === providerArray.length) {
      setSelectedProviders([]);
      return;
    }

    setSelectedProviders(providerArray.map(PROVIDER => PROVIDER.provider_name));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ backgroundColor: 'var(--mantine-color-dark-5)', margin: '-10px', padding: '10px' }}>
      <Flex justify="space-between" align="center" mb={10}>
        <Flex align="center" gap="xs">
          <Title order={5} fw={400}>
            구독중인 서비스를 선택해주세요.
          </Title>
          <Chip
            checked={selectedProviders?.length === providerArray.length}
            onChange={toggleAllSelectedProviders}
            size="xs"
            p={0}>
            All
          </Chip>
        </Flex>
        <ActionIcon component="button" type="submit" variant="transparent" align="center" size="sm">
          <IconSquareCheck />
        </ActionIcon>
      </Flex>
      <Chip.Group multiple value={selectedProviders} onChange={setSelectedProviders}>
        <Flex gap={3} wrap="wrap">
          {providerArray.map(provider => (
            <Chip key={provider.id} value={provider.provider_name} {...register(`${provider.provider_name}`)}>
              {provider.provider_name}
            </Chip>
          ))}
        </Flex>
      </Chip.Group>
    </form>
  );
};

export default SubscriptionEditor;
