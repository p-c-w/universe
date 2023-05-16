import React, { useCallback } from 'react';
import { PasswordInput } from '@mantine/core';
import { useController } from 'react-hook-form';
import { debounce } from 'lodash';

const Password = ({ name = '', control, trigger, label, setPw }) => {
  const {
    field: { onChange },
    fieldState: { error },
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
    setPw(e.target.value);
  };

  return (
    <>
      <PasswordInput
        onChange={handleChange}
        placeholder="Password"
        error={error?.message !== 'Expected string, received object' && error?.message}
        label={label}
        withAsterisk
      />
    </>
  );
};

export default Password;
