import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginType } from './types';
import { clear } from '@/redux/clear';
import { complement, isNil, pipe, prop } from 'ramda';
import { RootState } from '@/redux/root-reducer';

export const slice = 'authentication';
const initialState = { isAuthenticating: false, isLoggedIn: false };

export const {
  actions: { login, logoutSuccess, loginSuccess },
  reducer,
} = createSlice({
  name: slice,
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<LoginType>) => {
      state.isAuthenticating = true;
    }, 
    loginSuccess: state => {
      state.isAuthenticating = false;
      state.isLoggedIn = true;
    },
    logoutSuccess: state => {
      state.isAuthenticating = false;
      state.isLoggedIn = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(clear.type, () => initialState);
  },
});

// SELECTORS WITH RAMDA
const getAuthenticationSlice = (state: RootState) => state[slice];

const getIsAuthenticated = pipe(
  getAuthenticationSlice,
  prop('isLoggedIn'),
  complement(isNil)
);

const getIsAuthenticating = pipe(
  getAuthenticationSlice,
  prop('isAuthenticating')
);

export { getAuthenticationSlice, getIsAuthenticated, getIsAuthenticating };
