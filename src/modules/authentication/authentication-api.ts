import axios from 'axios';
import { LoginHandlerSuccessResponse } from './login-handler';
import { LoginType } from './types';

const loginRequest = ({ email , password}:LoginType) => { 
  return axios.post<LoginHandlerSuccessResponse>(
    '/api/login/',
    {
      email,
      password,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};

const logoutRequest = () => axios.get('/api/logout');

export { loginRequest, logoutRequest };
