import { useCallback, useState } from 'react';
import { debounce } from 'lodash';
import { useController } from 'react-hook-form';
import { TextInput, Button, Container } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import styled from '@emotion/styled';

const Input = styled(TextInput)`
  .mantine-TextInput-label {
    font-weight: 300;
    color: var(--mantine-color-cyan-4);
  }
`;

const ContinueBtn = styled(Button)`
  align-self: flex-end;
`;

const SignupInput = ({ name, control, trigger, step, setStep }) => {
  const [continueClicked, setContinueClicked] = useState(false);

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

  const ClickContinueBtn = () => {
    setStep(step + 1);
    setContinueClicked(true);
  };

  return (
    <>
      <Container display="flex" my={20} p={0}>
        <Input
          onChange={triggerWithChange}
          onKeyDown={preventEnter}
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
          <ContinueBtn
            type="button"
            onClick={ClickContinueBtn}
            fw={300}
            disabled={continueClicked}
            variant="outline"
            color="gray">
            Continue
          </ContinueBtn>
        )}
      </Container>
    </>
  );
};

export default SignupInput;
