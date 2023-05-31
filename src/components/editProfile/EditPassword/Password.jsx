import { useCallback } from 'react';
import { PasswordInput } from '@mantine/core';
import { useController } from 'react-hook-form';
import { debounce } from 'lodash';

const Password = ({ name, control, trigger, label }) => {
  const {
    field: { onChange },
    fieldState: { error },
  } = useController({ name, control, defaultValue: {} });

  const debouncedTrigger = useCallback(() => {
    debounce(() => {
      trigger(name);
    }, 100)();
  }, [name, trigger]);

  const triggerWithChange = e => {
    onChange(e);
    debouncedTrigger();
  };

  return (
    <PasswordInput
      onChange={triggerWithChange}
      placeholder="Password"
      error={error?.message !== 'Expected string, received object' && error?.message}
      label={label}
      withAsterisk
    />
  );
};

export default Password;
