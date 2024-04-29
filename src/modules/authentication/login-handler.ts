import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { setTokenCookie } from './cookies';
import { signJwt } from './session';

export type LoginHandlerSuccessResponse = {
  done: boolean;
};
export type ApiErrorResponse = { message: string };

const generateIdFromEmail = (email: string): number => {
  const hashCode: number = email
    .split('')
    .reduce((acc: number, char: string) => {
      return acc + char.charCodeAt(0);
    }, 0);

  const number: number = (hashCode % 10) + 1;

  return number;
};

const loginHandler: NextApiHandler<
  LoginHandlerSuccessResponse | ApiErrorResponse
> = async (req, res) => {
  try {
    if (req.method === 'POST') {
      console.log(req.body);
      const email = req.body['email'];
      if (email) {
        const id = generateIdFromEmail(email);
        const payload = {
          id,
          email,
        };
        const token = signJwt(payload);
        setTokenCookie(res)(token);
        return res.status(200).json({ done: true });
      }
      return res.status(400).json({ message: 'Email is required.' });
    }
    const message = 'Only POST method is supported.';
    return res.status(405).json({ message });
  } catch (err) {
    res.status(500).send({ message: 'failed to fetch data' });
  }
};

export default loginHandler;
