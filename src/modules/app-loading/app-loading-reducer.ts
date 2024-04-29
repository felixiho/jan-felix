import { clear } from '@/redux/clear';
import { RootState } from '@/redux/root-reducer';
import { createSlice } from '@reduxjs/toolkit';
import { not, pipe, prop } from 'ramda';

const slice = 'appLoading';
const initialState = { appIsLoading: true };

export const {
  actions: { finishAppLoading },
  reducer,
} = createSlice({
  name: slice,
  initialState,
  reducers: {
    finishAppLoading: state => {
      state.appIsLoading = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(clear.type, () => initialState);
  },
});

export type AppLoadingState = ReturnType<typeof reducer>;

const getAppLoadingSlice = (state: RootState) => state[slice];

const getAppFinishedLoading = pipe(
  getAppLoadingSlice,
  prop<'appIsLoading'>('appIsLoading'),
  not,
);

export { getAppFinishedLoading, slice };
