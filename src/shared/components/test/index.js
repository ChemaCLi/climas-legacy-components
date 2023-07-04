import React, { useState } from "react";

export const Test = () => {
    const [count, setCount] = useState(0);
    const onIncrement = () => setCount(count + 1);
    const onDecrement = () => setCount(count - 1);
    return (
      <div>
        <h1>This is a Counter Test App</h1>
        <p>Current count: <strong>{count}</strong></p>
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
      </div>
    );
};
