import {
  configureStore,
  ThunkAction,
  Action,
  createSlice,
  PayloadAction,
  combineReducers,
  AnyAction,
} from "@reduxjs/toolkit";
import { createEpicMiddleware, Epic } from "redux-observable";
import { filter, map, delay } from "rxjs/operators";
import counterReducer from "../features/counter/counterSlice";

export const counter = createSlice({
  name: "observable/counter",
  initialState: 0,
  reducers: {
    increment: (state, action: PayloadAction<number>) => state + action.payload,
    decrement: (state, action: PayloadAction<number>) => state - action.payload,
  },
});

const reducers = combineReducers({
  observable: counter.reducer,
  counter: counterReducer,
});

export type MyState = ReturnType<typeof reducers>;
export type MyEpic = Epic<AnyAction, AnyAction, MyState>;

const countEpic: MyEpic = (action$) => {
  return action$.pipe(
    filter(counter.actions.increment.match),
    delay(5000),
    map((action) => counter.actions.decrement(action.payload))
  );
};

const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, MyState>();

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: true }).concat(epicMiddleware),
});

epicMiddleware.run(countEpic);

export const { increment, decrement } = counter.actions;

export const selectCount = (state: MyState) => state.observable;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
