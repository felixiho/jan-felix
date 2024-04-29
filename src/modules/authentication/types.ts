import { NextApiRequest, NextApiResponse } from 'next';

export type LoginType = {
  email: string;
  password: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RequestResponseObject<ResponseData = any> = {
  request: NextApiRequest;
  response: NextApiResponse<ResponseData>;
};