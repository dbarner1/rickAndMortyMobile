import { configureStore } from '@reduxjs/toolkit';
import rickAndMortyReducer from './slices/rickAndMortySlice';

import thunkMiddleware from 'redux-thunk';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  rickAndMorty: rickAndMortyReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware],
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
