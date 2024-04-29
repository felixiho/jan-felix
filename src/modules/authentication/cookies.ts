import { parse, serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';
import { pipe } from 'ramda';

const TOKEN_NAME = 'authToken';
const MAX_AGE = 24 * 60 * 60;

const createCookie = (token: string) =>
  serialize(TOKEN_NAME, token, {
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    maxAge: MAX_AGE,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

const setHeader =
  <T>(response: NextApiResponse<T>) =>
  (cookie: string) =>
    response.setHeader('Set-Cookie', cookie);

const setTokenCookie = <T>(response: NextApiResponse<T>) =>
  pipe(createCookie, setHeader(response));

function removeTokenCookie<T>(response: NextApiResponse<T>) {
  const cookie = serialize(TOKEN_NAME, '', {
    maxAge: -1,
    path: '/',
  });

  response.setHeader('Set-Cookie', cookie);
}

function parseCookies(request: NextApiRequest) {
  if (request.cookies) {
    return request.cookies;
  }

  const cookie = request.headers?.cookie;
  return parse(cookie || '');
}

function getTokenCookie(request: NextApiRequest) {
  const cookies = parseCookies(request);
  return cookies[TOKEN_NAME];
}

export { getTokenCookie, removeTokenCookie, setTokenCookie };
