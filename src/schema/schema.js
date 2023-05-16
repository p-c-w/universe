import z from 'zod';

const signInSchema = z.object({
  email: z.string().min(1, '이메일을 입력해 주세요').email('이메일 형식에 맞게 입력해 주세요'),
  password: z
    .string()
    .min(1, '패스워드를 입력해 주세요')
    .regex(/^[a-zA-Z0-9]+$/, '영문 또는 숫자를 입력해 주세요')
    .min(6, '6자 이상 입력해 주세요')
    .max(12, '12자 이하로 입력해 주세요'),
});

const signUpSchema = signInSchema
  .and(
    z.object({
      confirmPassword: z.string().min(1, '패스워드를 확인해 주세요'),
    })
  )
  .refine(data => data.password === data.confirmPassword, {
    message: '패스워드가 일치하지 않습니다',
    path: ['confirmPassword'],
  });

const ChangePwSchema = z.object({
  nowPassword: z.string().min(1, '패스워드를 입력해 주세요'),
  newPassword: z
    .string()
    .min(1, '패스워드를 입력해 주세요')
    .regex(/^[a-zA-Z0-9]+$/, '영문 또는 숫자를 입력해 주세요')
    .min(6, '6자 이상 입력해 주세요')
    .max(12, '12자 이하로 입력해 주세요'),
  confirmPassword: z.string().min(1, '패스워드를 입력해 주세요'),
});

export { signInSchema, signUpSchema, ChangePwSchema };
