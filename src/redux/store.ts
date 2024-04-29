import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { RootState, rootReducer, rootState } from './root-reducer';
import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import rootSaga from './root-saga';
import { useMemo } from 'react';
import { createPersistStorage } from './storage';

const persistConfig = {
  key: 'root',
  storage: createPersistStorage(),
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const isClient = typeof window !== 'undefined';

function initStore(preloadedState = rootState) {
  const sagaMiddleware = createSagaMiddleware();

  const _store = configureStore({
    preloadedState: {
      ...preloadedState,
      _persist: {
        version: 0,
        rehydrated: false,
      },
    },
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({ thunk: false, serializableCheck: false }).prepend(
        sagaMiddleware,
      ),
  });

  // Avoid memory leaks, lel.
  if (isClient) {
    sagaMiddleware.run(rootSaga);
  }

  return _store;
}

let store: undefined | ReturnType<typeof initStore>;

const initializeStore = (preloadedState: RootState) => {
  let _store = store ?? initStore(preloadedState);

  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    store = undefined;
  }

  if (typeof window === 'undefined') return _store;

  if (!store) store = _store;

  return _store;
};

function useStore(initialState: RootState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}

export { useStore };
