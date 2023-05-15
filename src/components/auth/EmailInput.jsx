import React, { useCallback } from 'react';
import { useController } from 'react-hook-form';
import { TextInput, Container } from '@mantine/core';
import { debounce } from 'lodash';
import { IconX } from '@tabler/icons-react';

import styled from '@emotion/styled';

const MailInput = styled(TextInput)`
  .mantine-TextInput-label {
    font-weight: 300;
    color: var(--mantine-color-cyan-4);
  }
`;

const EmailInput = ({ name, control, trigger, children }) => {
  const {
    field: { onChange },
    fieldState: { invalid, isDirty, error },
  } = useController({ name, control, defaultValue: {} });

  const debouncedTrigger = useCallback(
    debounce(() => {
      trigger(name);
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
        <MailInput
          onChange={handleChange}
          w="100%"
          label="Enter your email"
          autoComplete="off"
          withAsterisk
          error={error?.message}
          icon={isDirty && invalid && <IconX size="1rem" strokeWidth={2} color={'#862d2d'} />}
        />
        {isDirty && !invalid && children}
      </Container>
    </>
  );
};

export default EmailInput;
