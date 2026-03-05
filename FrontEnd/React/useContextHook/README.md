# useContext Hook in React

## What Problem Does It Solve?

Without Context, passing data to deeply nested components requires **prop drilling** — sending props through every intermediate component even if they don't need it. Context eliminates this entirely.

---

## Setup Steps

### 1. Create the Context
Create a `context/` folder with a `context.js` file inside it:
```js
import { createContext } from "react";

export const contx = createContext(0); // 0 is the initial value
```

### 2. Provide the Context
In `App.jsx`, import the context and wrap your components with the Provider:
```jsx
import { contx } from "./context/context";

<contx.Provider value={{ count, setCount }}>
  <Navbar />
</contx.Provider>
```
> You can pass any state directly into `value` — here we pass both `count` and `setCount`.

### 3. Consume the Context
In any nested component, import and call `useContext` — no props needed:
```jsx
import { useContext } from "react";
import { contx } from "../context/context";

const { count, setCount } = useContext(contx);
```
You can now use `count` and `setCount` directly anywhere in that component.

---

## Advantage
✅ **Reduces prop drilling** — share state globally across any component without passing props through every layer.