import { z } from 'zod';
import { userCookie } from '~/cookies.server';

import { mainAPI } from '@api/config';

import type { Route } from '.react-router/types/app/routes/+types/login';

const formSchema = z.object({
  email: z.string().nonempty('Email daxil edilməlidir.').email('Email ünvanı düzgün formatda olmalıdır.'),

  password: z
    .string()
    .nonempty('Şifrə daxil edilməlidir.')
    .min(8, 'Şifrə ən azı 8 simvol olmalıdır.')
    .refine((value) => /[A-Z]/.test(value), {
      message: 'Şifrə ən azı 1 böyük hərf içərməlidir.',
    })
    .refine((value) => /[a-z]/.test(value), {
      message: 'Şifrə ən azı 1 kiçik hərf içərməlidir.',
    })
    .refine((value) => /[0-9]/.test(value), {
      message: 'Şifrə ən azı 1 rəqəm içərməlidir.',
    })
    .refine((value) => /[@$!%*?&]/.test(value), {
      message: 'Şifrə ən azı 1 xüsusi simvol içərməlidir. (@, $, !, %, *, ?, &)',
    }),
});

export async function action({ request }: Route.ActionArgs) {
  const cookieHeader = request.headers.get('Cookie');
  const cookie = (await userCookie.parse(cookieHeader)) || {};

  const formData = await request.formData();
  const raw = {
    email: formData.get('email') as string | null,
    password: formData.get('password') as string | null,
  };

  try {
    const data = formSchema.parse(raw);
    const resp = await mainAPI.post('/security/signup', data, {
      headers: {
        token: cookie.publicToken,
      },
    });

    return { success: true, data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      for (const issue of error.issues) {
        const path = issue.path[0];
        if (typeof path === 'string' && !errors[path]) {
          errors[path] = issue.message;
        }
      }

      return { success: false, errors, rawError: error };
    }

    // Optionally handle other errors
    return { success: false, errors: { general: 'Unexpected error' }, rawError: error };
  }
}
