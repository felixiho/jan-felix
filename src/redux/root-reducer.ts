import { combineReducers } from '@reduxjs/toolkit';
import {
  reducer as authenticationReducer,
  slice as authenticationSlice,
} from '@/modules/authentication/authentication-reducer';

import {
  reducer as appLoadingReducer,
  slice as appLoadingSlice,
} from '@/modules/app-loading/app-loading-reducer';

const rootReducer = combineReducers({
  [appLoadingSlice]: appLoadingReducer,
  [authenticationSlice]: authenticationReducer,
}); 

const rootState = rootReducer(undefined, { type: '' });

export type RootState = ReturnType<typeof rootReducer>;

export { rootReducer, rootState };
