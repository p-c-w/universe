import React, { useCallback, useState } from 'react';
import { useController } from 'react-hook-form';
import { TextInput, Button, Container } from '@mantine/core';
import { debounce } from 'lodash';
import { IconX } from '@tabler/icons-react';

import styled from '@emotion/styled';

const Input = styled(TextInput)`
  .mantine-TextInput-label {
    font-weight: 300;
    color: var(--mantine-color-cyan-4);
  }
`;

const InputButton = styled(Button)`
  align-self: flex-end;
`;

const SignupInput = ({ name, control, trigger, step, setStep }) => {
  const [continueBtn, setContinueBtn] = useState(false);

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

  const handleClick = () => {
    setStep(step + 1);
    setContinueBtn(true);
  };

  return (
    <>
      <Container display="flex" my={20} p={0}>
        <Input
          onChange={handleChange}
          onKeyDown={e => {
            if (e.keyCode === 13) {
              e.preventDefault();
            }
          }}
          w="100%"
          label={`Enter your ${name}`}
          autoComplete="off"
          withAsterisk
          error={error?.message !== 'Required' && error?.message}
          required={false}
          type={name.toLowerCase().includes('password') ? 'password' : 'text'}
          icon={isDirty && invalid && <IconX size="1rem" strokeWidth={2} color={'#862d2d'} />}
        />
        {isDirty && !invalid && (
          <InputButton
            type="button"
            onClick={handleClick}
            fw={300}
            disabled={continueBtn}
            variant="outline"
            color="gray">
            Continue
          </InputButton>
        )}
      </Container>
    </>
  );
};

export default SignupInput;
