// utils/cookie.ts
import { deleteCookie as deleteCookieNext, getCookie as getCookieNext, setCookie as setCookieNext } from 'cookies-next';
import type { NextApiRequest, NextApiResponse } from 'next';

// set cookie
export function setCookie(name: string, value: string, days = 1, req?: NextApiRequest, res?: NextApiResponse) {
  setCookieNext(name, value, { req, res, maxAge: days * 24 * 60 * 60, path: '/' });
}

// get cookie
export function getCookie(name: string, req?: NextApiRequest, res?: NextApiResponse): string | null {
  return getCookieNext(name, { req, res }) as string | null;
}

// delete cookie
export function deleteCookie(name: string, req?: NextApiRequest, res?: NextApiResponse) {
  deleteCookieNext(name, { req, res, path: '/' });
}
