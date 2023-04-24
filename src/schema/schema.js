import { z } from 'zod';

// const useridRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
const passwordRegExp = /^[A-Za-z0-9]{6,12}$/;

const signInSchema = z.object({
  // email: z.string().regex(useridRegExp, '이메일 형식에 맞게 입력해 주세요.'),
  email: z.string().min(1, '이메일을 입력해 주세요').email('이메일 형식에 맞게 입력해 주세요'),
  password: z.string().regex(passwordRegExp, '영문 또는 숫자를 6~12자 입력하세요.'),
});

const signUpSchema = signInSchema.and(
  z
    .object({
      confirmPassword: z.string(),
    })
    .refine(({ password, confirmPassword }) => password === confirmPassword, {
      path: ['confirmPassword'],
      message: '패스워드가 일치하지 않습니다.',
    })
);

export { signInSchema, signUpSchema };
