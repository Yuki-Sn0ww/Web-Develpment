# ⚛️ React `useEffect` Hook — Revision Notes

> **Topic:** Side Effects in React Functional Components  
> **Source:** CodeWithHarry YouTube Tutorial  
> **Stack:** React + Vite

---

## 📌 What is a Side Effect?

React's only job is → **take data, return JSX (UI)**.

Anything outside of that is a **side effect**:
- Fetching data from an API
- Setting a timer (`setInterval`, `setTimeout`)
- Logging to console
- Touching browser storage (localStorage)
- Adding/removing event listeners

These cannot go directly inside the render — they go inside `useEffect`.

---

## 📦 Basic Syntax

```jsx
import { useEffect } from 'react'

useEffect(() => {
  // side effect code here

  return () => {
    // optional cleanup function
  }
}, [/* dependency array */])
```

---

## 🔁 The 3 Cases (Most Important)

### Case 1 — No Dependency Array → Runs on EVERY render

```jsx
useEffect(() => {
  alert("I run on every render!")
}) // no second argument
```

- Fires after every re-render
- Rarely used, can cause performance issues
- Use only for debugging renders

---

### Case 2 — Empty Array `[]` → Runs ONCE (on mount)

```jsx
useEffect(() => {
  alert("Welcome! Page just loaded")
}, []) // empty array
```

- Fires only once when component first appears on screen
- Best for: **initial API calls, welcome messages, one-time setup**

---

### Case 3 — Array with Values `[count]` → Runs when VALUE changes

```jsx
const [count, setCount] = useState(0)
const [color, setColor] = useState(0)

useEffect(() => {
  alert("Count changed!")
  setColor(color + 1)   // also update color when count changes
}, [count]) // only watches count
```

- Fires after first render AND whenever `count` changes
- If `color` changes → effect does NOT run (not in the array)
- Best for: **search filters, reactions to state changes**

---

## 🧹 Cleanup Function

```jsx
useEffect(() => {
  alert("Navbar mounted! Timer started.")

  const timer = setInterval(() => {
    console.log("tick")
  }, 1000)

  return () => {
    alert("Navbar removed! Timer stopped.")
    clearInterval(timer) // stops the timer
  }
}, []) // runs once, cleans up on unmount
```

- The `return () => {}` part is the **cleanup**
- Runs when the component is **removed from the UI (unmounted)**
- Without cleanup → timer keeps running even after component disappears = **memory leak** ❌

**When does cleanup run?**
1. When the component unmounts (removed from screen)
2. Before the effect runs again (for effects with dependencies)

---

## 🏠 Your App.jsx Code Explained

```jsx
const [count, setCount] = useState(0)
const [color, setColor] = useState(0)

useEffect(() => {
  alert("Count was changed")
  setColor(color + 1)
}, [count])
```

**Flow:**
1. Click button → `count` increases
2. `count` is in dependency array → effect fires
3. Alert shows → `color` also increments
4. `color` changes → but `color` is NOT in the array → no extra effect

---

## 🧭 Your Navbar.jsx Code Explained

```jsx
// Case 1 - every render
useEffect(() => {
  alert("I run on every render")
})

// Case 2 - only once on mount
useEffect(() => {
  alert("Welcome! First render only")
}, [])

// Case 3 - when color prop changes
useEffect(() => {
  alert("Color changed to: " + color)
}, [color])

// Cleanup example
useEffect(() => {
  alert("First render of Navbar")
  return () => {
    alert("Navbar was removed from screen")
  }
}, [])
```

You can have **multiple useEffect hooks** in one component — React runs them all in order.

---

## ⚠️ Common Mistake — Stale Closure

```jsx
// ❌ Bug — color is used but not listed as dependency
useEffect(() => {
  document.title = "Color is " + color
}, [count]) // color might be stale/outdated!

// ✅ Correct — list everything you use inside the effect
useEffect(() => {
  document.title = "Color is " + color
}, [color])
```

**Rule:** Every variable from the component that you use inside `useEffect` should be in the dependency array.

---

## 🔁 Why Alert Fires Twice in Development

- `<React.StrictMode>` in `main.jsx` intentionally mounts components **twice** in development
- Purpose: helps you catch bugs in effects that aren't properly cleaned up
- **This only happens in development** — production builds behave normally
- Fix: don't remove StrictMode, just write proper cleanup functions

---

## 📊 Quick Reference Table

| Dependency Array | When Effect Runs |
|---|---|
| Missing (no array) | After **every** render |
| `[]` empty | Once after **first** render only |
| `[count]` | After first render + when `count` changes |
| `[count, color]` | After first render + when `count` OR `color` changes |

---

## 📚 Related Topics (Study These Next)

### 1. `useCallback` Hook
- Problem: functions are re-created on every render, causing child components to re-render unnecessarily
- Solution: `useCallback` memoizes a function so it only changes when its dependencies change
```jsx
const handleClick = useCallback(() => {
  setCount(count + 1)
}, [count])
```

---

### 2. `useMemo` Hook
- Similar to `useCallback` but for **values**, not functions
- Caches the result of an expensive calculation
```jsx
const expensiveResult = useMemo(() => {
  return items.filter(item => item.active) // only recalculates when items changes
}, [items])
```

---

### 3. Custom Hooks
- You can extract `useEffect` logic into your own reusable hook
```jsx
// useFetch.js — custom hook
function useFetch(url) {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setData(data))
  }, [url])

  return data
}

// Using it in a component
function App() {
  const users = useFetch("https://jsonplaceholder.typicode.com/users")
  return <div>{users?.length} users loaded</div>
}
```

---

### 4. React Component Lifecycle (What `useEffect` Replaces)
In old class components, there were lifecycle methods. `useEffect` replaces all of them:

| Old Class Method | `useEffect` Equivalent |
|---|---|
| `componentDidMount` | `useEffect(() => {}, [])` |
| `componentDidUpdate` | `useEffect(() => {}, [value])` |
| `componentWillUnmount` | `return () => {}` inside useEffect |

---

### 5. `useRef` Hook
- Often used alongside `useEffect` to store a value that persists between renders WITHOUT causing a re-render
```jsx
const timerRef = useRef(null)

useEffect(() => {
  timerRef.current = setInterval(() => {
    console.log("tick")
  }, 1000)

  return () => clearInterval(timerRef.current)
}, [])
```

---

### 6. Data Fetching Pattern (Real World useEffect)
The proper way to fetch data with `useEffect`:

```jsx
function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)

    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => {
        setUsers(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  )
}
```

---

### 7. Race Condition Fix with Cleanup (Advanced)
When user types fast and multiple API calls fire, old responses can arrive after newer ones. Fix using a cleanup flag:

```jsx
useEffect(() => {
  let cancelled = false  // flag

  fetch(`/api/search?q=${query}`)
    .then(res => res.json())
    .then(data => {
      if (!cancelled) setResults(data)  // only update if still relevant
    })

  return () => {
    cancelled = true  // cancel old calls when query changes again
  }
}, [query])
```

---

## 🧠 Mental Model

Think of `useEffect` as:

> *"After React finishes rendering, run this code. And optionally, clean up before running it again."*

1. React renders the component ✅
2. React updates the DOM ✅
3. **useEffect fires** ✅
4. (Next render) cleanup runs first → then effect fires again

---

## ✅ Checklist Before Moving On

- [ ] I understand what a "side effect" is
- [ ] I know the 3 cases of the dependency array
- [ ] I know when and why to write a cleanup function
- [ ] I understand why alerts fire twice in development (StrictMode)
- [ ] I know NOT to use variables inside useEffect without adding them to the dependency array
- [ ] I've read about `useCallback`, `useMemo`, and `useRef` (related hooks)
- [ ] I know the data fetching pattern with loading + error states
