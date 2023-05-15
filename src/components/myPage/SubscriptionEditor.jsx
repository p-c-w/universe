import { useState } from 'react';
import styled from '@emotion/styled';
import { Chip, Flex, Title, ActionIcon, useMantineColorScheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconSquareCheck } from '@tabler/icons-react';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atom';
import { useUpdateSubscriptionMutation } from '../../hooks/mutations';
import { getNewSubscribeList, getProviderArray } from '../../utils';

const EditForm = styled.form`
  margin: 1rem -0.625rem;
  padding: 1rem;
  background-color: ${({ theme }) => (theme.colorScheme === 'dark' ? theme.colors.gray[8] : theme.colors.gray[3])};
`;

const providerArray = getProviderArray();

const SubscriptionEditor = ({ providers, onClick }) => {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const xsmallScreen = useMediaQuery('(max-width: 30rem)');

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
    <EditForm onSubmit={handleSubmit(onSubmit)}>
      <Flex justify="space-between" align="center" mb={10}>
        <Flex align="center" gap="xs">
          <Title order={5} fw={400} fz={xsmallScreen ? 12 : 16}>
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
            <Chip
              key={provider.id}
              value={provider.provider_name}
              color={dark ? `${provider.provider_name}.4` : provider.provider_name}
              size={xsmallScreen ? 'xs' : 'sm'}
              {...register(`${provider.provider_name}`)}>
              {provider.provider_name}
            </Chip>
          ))}
        </Flex>
      </Chip.Group>
    </EditForm>
  );
};

export default SubscriptionEditor;
