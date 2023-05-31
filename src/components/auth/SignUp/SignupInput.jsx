import { useCallback, useState } from 'react';
import { debounce } from 'lodash';
import { useController } from 'react-hook-form';
import { TextInput, Button, Container } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import styled from '@emotion/styled';

const Input = styled(TextInput)`
  width: 100%;
  .mantine-TextInput-label {
    font-weight: 300;
    color: var(--mantine-color-cyan-4);
  }
`;

const ContinueButton = styled(Button)`
  font-weight: 300;
  align-self: flex-end;
`;

const isPassword = name => name.toLowerCase().includes('password');

const SignupInput = ({ name, control, trigger, step, setStep }) => {
  const [buttonActive, setButtonActive] = useState(false);

  const {
    field: { onChange },
    fieldState: { invalid, isDirty, error },
  } = useController({ name, control, defaultValue: {} });

  const debouncedTrigger = useCallback(() => {
    debounce(() => {
      trigger(name);
      if (name === 'password') trigger('confirmPassword');
    }, 100)();
  }, [name, trigger]);

  const triggerWithChange = e => {
    onChange(e);
    debouncedTrigger();
  };

  const preventEnter = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const clickContinueButton = () => {
    setStep(step + 1);
    setButtonActive(true);
  };

  return (
    <>
      <Container display="flex" my={20} p={0}>
        <Input
          onChange={triggerWithChange}
          onKeyDown={preventEnter}
          label={`Enter your ${name}`}
          autoComplete="off"
          withAsterisk
          error={error?.message !== 'Required' && error?.message}
          required={false}
          type={isPassword(name) ? 'password' : 'text'}
          icon={isDirty && invalid && <IconX size={16} strokeWidth={2} />}
        />
        {isDirty && !invalid && (
          <ContinueButton
            type="button"
            onClick={clickContinueButton}
            disabled={buttonActive}
            variant="outline"
            color="gray.5">
            Continue
          </ContinueButton>
        )}
      </Container>
    </>
  );
};

export default SignupInput;
