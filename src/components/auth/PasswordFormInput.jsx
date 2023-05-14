import React, { useCallback } from 'react';
import { useController } from 'react-hook-form';
import { PasswordInput, Button, Container } from '@mantine/core';
import { debounce } from 'lodash';
import { IconX, IconCheck } from '@tabler/icons-react';

import styled from '@emotion/styled';

const Input = styled(PasswordInput)`
  .mantine-PasswordInput-label {
    font-weight: 300;
    color: var(--mantine-color-cyan-4);
  }
`;

const InputButton = styled(Button)`
  align-self: flex-end;
`;

const PasswordFormInput = ({ name, control, trigger, setStep, step }) => {
  console.log('password ');
  const {
    field: { onChange },
    fieldState: { invalid, isDirty, error },
  } = useController({ name, control, defaultValue: {} });

  const debouncedTrigger = useCallback(
    debounce(() => {
      trigger(name);
      if (name === 'password') trigger('confirmPassword');
    }, 100),
    []
  );

  const handleChange = e => {
    onChange(e);
    debouncedTrigger();
  };

  return (
    <>
      <Container display="flex" my={20} p={0}>
        <Input
          onChange={handleChange}
          w="100%"
          label="Enter your email"
          autoComplete="off"
          withAsterisk
          error={error?.message}
          icon={isDirty && invalid && <IconX size="1rem" strokeWidth={2} color={'#862d2d'} />}
        />
        {!invalid && (
          <InputButton
            type="button"
            onClick={() => {
              setStep(step + 1);
            }}
            fw={300}
            variant="outline"
            color="gray">
            Continue
          </InputButton>
        )}
      </Container>
    </>
  );
};

export default PasswordFormInput;
