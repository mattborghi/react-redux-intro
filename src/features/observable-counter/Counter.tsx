import React, { useState } from "react";
import { selectCount, increment, decrement } from "../../app/store";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

export function Counter() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState("2");

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <>
      <p>Hello!</p>
      <span>{count}</span>
      <button
        onClick={() => {
          console.log("decrement");
          dispatch(increment(1));
        }}
      >
        Increment
      </button>
    </>
  );
}
