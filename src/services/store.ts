import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import IngredientsReducer from './slices/ingredientsSlice';
import ConstructorReducer from './slices/constructorSlice';
import UserReducer from './slices/userSlice';
import FeedReducer from './slices/feedSlice';

export const rootReducer = combineReducers({
  ingredients: IngredientsReducer,
  constructorItems: ConstructorReducer,
  user: UserReducer,
  feed: FeedReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
