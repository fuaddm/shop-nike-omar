import { createCookie } from 'react-router';

export const userCookie = createCookie('user', {
  maxAge: 10_800_000, // one week
});
