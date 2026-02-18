# ⚛️ React Hooks & State — Revision Notes

---

## 🧩 What Are Hooks?

Hooks are **special built-in functions** in React that let functional components tap into React features — like managing data or handling lifecycle events — that used to require class components.

> **Key idea:** Hooks "hook into" React's internal system from inside a plain function.

**Rules of Hooks:**
- Only call hooks at the **top level** of your component (not inside loops or conditions)
- Only call hooks inside **React function components**

---

## 🤔 Why Were Hooks Introduced?

Before Hooks (React < 16.8), if you wanted to manage state or use lifecycle methods, you had to write a **class component** — which was verbose and harder to reuse logic across components.

Hooks were introduced to:
- Make functional components **fully capable** (state, side effects, etc.)
- **Simplify** component code — no more `this.setState`, `this.state`, or class syntax
- Make logic **reusable** via custom hooks

---

## 🔢 The `useState` Hook

The most fundamental hook. It adds **state** to a functional component.

### Syntax

```js
const [count, setCount] = useState(0);
```

| Part | What it is |
|---|---|
| `count` | The **current state value** |
| `setCount` | The **setter function** — call this to update state |
| `0` | The **initial value** of state |

This uses **array destructuring** — `useState` returns a pair `[value, setter]`.

---

## ❓ Why Not Just Use a Regular Variable?

This is the core "aha!" moment.

```js
// ❌ Regular variable — React doesn't know this changed
let count = 0;
count = count + 1; // UI never updates

// ✅ State variable — React knows, and re-renders the UI
const [count, setCount] = useState(0);
setCount(count + 1); // UI updates automatically
```

| | Regular Variable (`let`) | React State (`useState`) |
|---|---|---|
| Updates in memory | ✅ Yes | ✅ Yes |
| Triggers re-render | ❌ No | ✅ Yes |
| UI updates | ❌ Manual only | ✅ Automatic |

---

## 🔄 How React Re-rendering Works

1. You call `setCount(newValue)`
2. React is **notified** of the change
3. React **re-renders** the component — recalculates the JSX
4. React updates **only the changed parts** of the DOM (no full page reload)

> **YouTube analogy from the video:** You can browse comments while a video plays because React only updates the part of the UI that changed — not the whole page.

---

## 💻 The Code from the Tutorial

```jsx
import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>the value of count is {count}</div>
      <button onClick={() => { setCount(count + 1) }}>
        update count
      </button>
    </>
  )
}

export default App
```

### What's happening line by line:

- `import { useState } from 'react'` — import the hook from React
- `const [count, setCount] = useState(0)` — create a state variable starting at `0`
- `{count}` — display the current value inside JSX (curly braces = JS expression)
- `onClick={() => { setCount(count + 1) }}` — when the button is clicked, update state by adding 1
- React detects the state change → re-renders → displays the new count

---

## 🛠️ Vite (Build Tool Used)

The tutorial uses **Vite** instead of the older `create-react-app`.

| | Vite | create-react-app |
|---|---|---|
| Speed | ⚡ Much faster | 🐢 Slower |
| Modern tooling | ✅ Yes | ❌ Outdated |

---

## 🧠 Declarative UI — The React Philosophy

React is **declarative**: you describe *what* the UI should look like based on state.

> "When `count` is 3, show `the value of count is 3`"

React handles *how* to update the browser DOM efficiently. You never manually touch the DOM like in vanilla JS (`document.getElementById(...).innerText = ...`).

---

## 📌 Quick Summary

- **Hooks** = functions that give functional components React superpowers
- **`useState`** = hook for managing data that changes over time
- **Setter function** (`setCount`) = the only correct way to update state
- **Re-render** = React automatically re-runs your component and updates the UI when state changes
- **No page reload** = React surgically updates only what changed in the DOM
