import { call, put, takeEvery } from 'redux-saga/effects';
import {
  login,
  loginSuccess,
  logoutSuccess,
  slice,
} from './authentication-reducer';
import { createAction } from '@reduxjs/toolkit';
import logoutHandler from './logout-handler';
import { clear } from '@/redux/clear';
import loginHandler from './login-handler';
import { loginRequest, logoutRequest } from './authentication-api';

export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

function* handleLogin({
  payload: { email, password },
}: ReturnType<typeof login>) {
  yield delay(1000);
  yield call(loginRequest, { email, password });
  yield put(loginSuccess());
}

function* watchLogin() {
  yield takeEvery(login.type, handleLogin);
}

const logout = createAction(`${slice}/logout`);

function* handleLogout() {
  yield delay(500);
  yield call(logoutRequest);
  yield put(logoutSuccess());
  yield put(clear());
}

function* watchLogout() {
  yield takeEvery(logout.type, handleLogout);
}

export { watchLogin, watchLogout };
