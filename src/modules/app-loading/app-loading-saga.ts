import { createAction } from '@reduxjs/toolkit';
 
import { call, delay, put, takeEvery } from 'redux-saga/effects';

import { finishAppLoading, slice } from './app-loading-reducer';

const loadApp = createAction(`${slice}/loadApp`);

function* handleLoadApp() {
  // yield call(handleFetchCurrentUsersProfile);
  yield delay(2000)
  yield put(finishAppLoading());
}

function* watchLoadApp() {
  yield takeEvery(loadApp.type, handleLoadApp);
}

export { handleLoadApp, loadApp, watchLoadApp };
