import { data } from 'react-router';
import { z } from 'zod';
import { userCookie } from '~/cookies.server';

import { publicAPI } from '@api/public-api';

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

  // rememberMe üçün preprocess: "on" | "true" | true -> true, digər hallarda false
  rememberMe: z.preprocess((value) => {
    // value: string | null | boolean | File
    if (typeof value === 'string') {
      return value === 'on' || value === 'true';
    }
    if (typeof value === 'boolean') return value;
    return false;
  }, z.boolean()),
});

export async function action({ request }: Route.ActionArgs) {
  const cookieHeader = request.headers.get('Cookie');
  const cookie = (await userCookie.parse(cookieHeader)) || {};

  const formData = await request.formData();
  const raw = {
    email: formData.get('email') as string | null,
    password: formData.get('password') as string | null,
    rememberMe: formData.get('rememberMe'), // "on" | null
  };

  try {
    const parsedData = formSchema.parse(raw);

    const resp = await publicAPI.post('/security/sign-in', cookie, {
      body: JSON.stringify(parsedData),
      headers: {
        token: cookie.publicToken,
        'Content-Type': 'application/json',
      },
    });

    const respData = await resp.json();

    cookie.privateToken = respData?.data?.token;
    cookie.rememberMeToken = respData?.data?.rememberMeToken;

    return data(
      { success: true, data },
      {
        headers: {
          'Set-Cookie': await userCookie.serialize(cookie),
        },
      }
    );
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
