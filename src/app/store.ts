import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";

import counterReducer from "../features/counter/counterSlice";
import observableReducer, {
  epicMiddleware,
} from "../features/observable-counter/counterSlice";

export const reducers = combineReducers({
  observable: observableReducer,
  counter: counterReducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: true }).concat(epicMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
