import {
  watchLogin,
  watchLogout,
} from '@/modules/authentication/authentication-saga';
import { all } from 'redux-saga/effects';

function* rootSaga() {
  yield all([watchLogin(), watchLogout()]);
}

export default rootSaga