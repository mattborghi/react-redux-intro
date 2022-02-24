import { RootState, reducers } from "../../app/store";
import { PayloadAction, createSlice, AnyAction } from "@reduxjs/toolkit";
import { createEpicMiddleware, Epic } from "redux-observable";
import { filter, map, delay } from "rxjs/operators";

export const counter = createSlice({
  name: "observable/counter",
  initialState: 0,
  reducers: {
    increment: (state, action: PayloadAction<number>) => state + action.payload,
    decrement: (state, action: PayloadAction<number>) => state - action.payload,
  },
});

export const { increment, decrement } = counter.actions;


export default counter.reducer;

// what's the difference with RootState?
// export type MyState = ReturnType<typeof counter.reducer>;
type MyState = ReturnType<typeof reducers>;
type MyEpic = Epic<AnyAction, AnyAction, MyState>;

export const selectCount = (state: RootState) => state.observable;

const countEpic: MyEpic = (action$) => {
  return action$.pipe(
    filter(counter.actions.increment.match),
    delay(5000),
    map((action) => counter.actions.decrement(action.payload))
  );
};

export const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, MyState>();

epicMiddleware.run(countEpic);