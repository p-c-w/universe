import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import { Chip, Flex, Title, ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconSquareCheck } from '@tabler/icons-react';
import { userState } from '../../../recoil/atom';
import { useUpdateSubscriptionMutation } from '../../../hooks/mutations';
import { PROVIDERS } from '../../../constants';

const EditForm = styled.form`
  margin: 1rem -0.625rem;
  padding: 1rem;
  background-color: ${({ theme }) => (theme.colorScheme === 'dark' ? theme.colors.gray[8] : theme.colors.gray[3])};
`;

const providerArray = Object.entries(PROVIDERS).map(entry => ({ id: +entry[0], ...entry[1] }));

const getNewSubscribeList = selectedNames => {
  const newProviderNames = selectedNames.map(name => providerArray.find(item => item.provider_name === name));
  const newList = newProviderNames.map(provider => ({ id: provider.id, price: 'basic' }));

  return newList;
};

const Editor = ({ providers, toggleEditMode }) => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const providersNames = providers?.map(id => PROVIDERS[id].provider_name);

  const { mutate: updateSubscribeList } = useUpdateSubscriptionMutation();

  const email = useRecoilValue(userState);
  const [selectedProviders, setSelectedProviders] = useState(providersNames);

  const { register, handleSubmit } = useForm();

  const submitSubscriptions = (_, e) => {
    e.preventDefault();

    updateSubscribeList({ email, newList: getNewSubscribeList(selectedProviders) });
    toggleEditMode();
  };

  const toggleAllSelectedProviders = () => {
    if (selectedProviders.length === providerArray.length) {
      setSelectedProviders([]);
      return;
    }

    setSelectedProviders(providerArray.map(PROVIDER => PROVIDER.provider_name));
  };

  return (
    <EditForm onSubmit={handleSubmit(submitSubscriptions)}>
      <Flex justify="space-between" align="center" mb={10}>
        <Flex align="center" gap="xs">
          <Title order={5} fw={400} fz={16}>
            구독중인 서비스를 선택해주세요.
          </Title>
          <Chip
            checked={selectedProviders?.length === providerArray.length}
            onChange={toggleAllSelectedProviders}
            size="sm"
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
            <Chip
              key={provider.id}
              value={provider.provider_name}
              color={dark ? `${provider.provider_name}.4` : provider.provider_name}
              size="sm"
              {...register(`${provider.provider_name}`)}>
              {provider.provider_name}
            </Chip>
          ))}
        </Flex>
      </Chip.Group>
    </EditForm>
  );
};

export default Editor;
