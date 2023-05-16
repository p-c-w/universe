import React, { useCallback } from 'react';
import { PasswordInput } from '@mantine/core';
import { useController } from 'react-hook-form';

const Password = ({ name, control, trigger, label }) => {
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
      <PasswordInput
        onChange={handleChange}
        placeholder="Password"
        error={error?.message !== 'Required' && error?.message}
        label={label}
        withAsterisk
      />
    </>
  );
};

export default Password;
