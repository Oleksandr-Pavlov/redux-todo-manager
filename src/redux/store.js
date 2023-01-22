import storage from 'redux-persist/lib/storage';
import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { persistReducer } from 'redux-persist';
import { filtersReducer } from './filtersSlice';
import { tasksReducer } from './tasksSlice';
import { combineReducers } from '@reduxjs/toolkit';

const persistConfig = {
  key: 'tasks',
  storage,
  whitelist: ['tasks'],
};

const combinedReducer = combineReducers({
  tasks: tasksReducer,
  filters: filtersReducer,
});

export const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
