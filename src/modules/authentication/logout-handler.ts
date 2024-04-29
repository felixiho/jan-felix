import { NextApiHandler } from 'next';

import { removeTokenCookie } from './cookies'; 

const logoutHandler: NextApiHandler = async (request, response) => {
  if (request.method === 'GET') { 
    removeTokenCookie(response);
    response.writeHead(302, { Location: '/' });
    return response.end();
  }

  const message = 'Only GET method is supported.';
  return response.status(405).json({ message });
};

export default logoutHandler;
