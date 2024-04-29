import jwt from 'jsonwebtoken';

import { getTokenCookie } from './cookies';
import { asyncPipe } from '@/utils/async-pipe';

export const JWT_SECRET = 'felix-secret-10';
const options = { expiresIn: '24h' };

const signJwt = (payload: { id: number; email: string }) =>
  jwt.sign(payload, JWT_SECRET, options);

const decodeJwt = (token: string) => token && jwt.verify(token, JWT_SECRET);

const getSession = asyncPipe(getTokenCookie, decodeJwt);

export { signJwt, getSession };
