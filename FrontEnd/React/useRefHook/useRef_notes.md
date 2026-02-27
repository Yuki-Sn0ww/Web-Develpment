# ⚛️ React `useRef` Hook — Revision Notes

> **Topic:** useRef Hook in React  
> **Source:** CodeWithHarry YouTube Tutorial  
> **Video:** https://youtu.be/VlSNiL_x4mo

---

## 📌 The Problem First — Why Does `useRef` Exist?

Before understanding `useRef`, you need to understand the problem it solves.

In React you have two ways to store values:

### Option 1 — `useState`
```jsx
const [count, setCount] = useState(0)
```
✅ Persists across re-renders  
❌ Every update causes a re-render

### Option 2 — Normal Variable
```jsx
let a = 0
```
✅ Does NOT cause re-render  
❌ Resets to 0 on every re-render — value never persists

---

### The Normal Variable Problem (From Harry's Video)

```jsx
function App() {
  const [count, setCount] = useState(0)
  let a = 0  // normal variable

  useEffect(() => {
    a = a + 1
    console.log("value of a is: " + a) // ALWAYS prints 1 — never 2, 3, 4...
  })

  return (
    <button onClick={() => setCount(count + 1)}>
      count is {count}
    </button>
  )
}
```

**Why it fails:**
1. Click button → `count` changes → component re-renders
2. Re-render means the entire function runs again
3. `let a = 0` runs again → a resets back to 0
4. `useEffect` runs → a becomes 1 again
5. This repeats forever — value never grows beyond 1

---

## ✅ The Solution — `useRef`

`useRef` fills the exact gap between `useState` and normal variables:

```
useState    → persists + causes re-render
normal var  → no re-render + does NOT persist
useRef      → persists + does NOT cause re-render ✅
```

---

## 📦 Syntax

```jsx
import { useRef } from 'react'

const myRef = useRef(initialValue)

// Reading the value
console.log(myRef.current)

// Updating the value
myRef.current = "new value"
```

**Always use `.current`** — this is how you read and update a ref. The ref object itself never changes, only `.current` changes.

---

## 🔁 How It Works Internally

When you write `const a = useRef(0)`, React creates an object like this:

```js
{ current: 0 }
```

This object is stored outside the normal render cycle. So when the component re-renders and the function runs again — React returns the SAME object with the SAME `.current` value instead of creating a new one.

This is the "magic" Harry talks about in the video — React internally keeps a reference to this object across all renders.

---

## 📍 Two Main Use Cases

---

### Use Case 1 — Persisting a Value Without Re-render

**When to use:** You want to track or store a value across renders but you DON'T want the UI to update when it changes.

```jsx
function App() {
  const [count, setCount] = useState(0)
  const renderCount = useRef(0)

  useEffect(() => {
    renderCount.current = renderCount.current + 1
    console.log("Component rendered " + renderCount.current + " times")
  })
  // if useState was used here — every update would trigger
  // another re-render — causing an INFINITE LOOP ❌

  return (
    <button onClick={() => setCount(count + 1)}>
      count is {count}
    </button>
  )
}
```

**Real world examples:**
- Counting how many times a component rendered
- Storing a previous value to compare with current
- Storing a timer ID (`setInterval` / `setTimeout`)

---

### Use Case 2 — Accessing DOM Elements Directly

**When to use:** You need to directly touch a DOM element — focus it, change its style, hide it, scroll it etc.

In plain JavaScript you would do:
```js
// ❌ Avoid this in React — this is DOM manipulation the old way
document.getElementById("myBtn").style.backgroundColor = "red"
```

In React, use `useRef` instead:

```jsx
// ✅ React way — 3 steps

// Step 1: Create the ref
const btnRef = useRef()

// Step 2: Attach ref to the element in JSX
<button ref={btnRef}>Click me</button>

// Step 3: Use it anywhere
useEffect(() => {
  btnRef.current.style.backgroundColor = "red"
}, [])
```

`btnRef.current` IS the actual DOM element — same as what `document.getElementById` returns.

---

## 🧑‍💻 Your Code From the Video Explained

```jsx
function App() {
  const [count, setCount] = useState(0)
  const btnRef = useRef()  // ref created, .current is undefined for now

  useEffect(() => {
    console.log("First rendering..")
    btnRef.current.style.backgroundColor = "red"  // button turns red on mount
  }, [])  // runs only once

  return (
    <>
      {/* ref is attached here — now btnRef.current = this button */}
      <button ref={btnRef} onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>

      {/* clicking this hides the count button */}
      <button onClick={() => { btnRef.current.style.display = "none" }}>
        Change me
      </button>
    </>
  )
}
```

**Flow:**
1. Component mounts → `btnRef` gets attached to the count button DOM element
2. `useEffect` fires once → `btnRef.current` is now the button → background turns red
3. Click "Change me" → `btnRef.current.style.display = "none"` → count button disappears from screen

---

## ⚠️ Most Important Rule — Never Display `ref.current` in JSX

This is a very common mistake beginners make:

```jsx
// ❌ WRONG — UI will NOT update when a.current changes
const a = useRef(0)

return <h1>{a.current}</h1>  // this will always show 0
```

**Why it fails:** Changing `a.current` does NOT trigger a re-render. So React never knows to update the screen. The displayed value stays frozen.

```jsx
// ✅ CORRECT — use useState for values you want to DISPLAY
const [a, setA] = useState(0)

return <h1>{a}</h1>  // updates every time setA is called
```

**Rule from Harry's video:** Only use `useRef` for values that are NOT shown in the DOM. If the value affects the UI — use `useState`.

---

## 🔄 `useRef` vs `useEffect` — They Are NOT the Same

A common confusion — both seem to "run after render". But they solve completely different problems:

| | `useEffect` | `useRef` |
|---|---|---|
| **Purpose** | Controls WHEN code runs | STORES a value |
| **Job** | Side effects, subscriptions, timers | Persisting values, DOM access |
| **Re-renders?** | No | No |
| **Persists?** | N/A | Yes |

They are almost always used TOGETHER:

```jsx
const renderCount = useRef(0)   // useRef STORES the value

useEffect(() => {                // useEffect decides WHEN to update it
  renderCount.current += 1
})
```

`useEffect` = **when** to run code  
`useRef` = **where** to store a value that survives re-renders

---

## 🧠 useRef with Timers (Very Important Pattern)

This is one of the most common real-world uses of `useRef`. You'll need this for the Stopwatch exercise:

```jsx
function Stopwatch() {
  const [seconds, setSeconds] = useState(0)
  const timerRef = useRef(null)  // stores the interval ID

  const start = () => {
    timerRef.current = setInterval(() => {
      setSeconds(s => s + 1)
    }, 1000)
  }

  const stop = () => {
    clearInterval(timerRef.current)  // works because ref persists!
  }

  const reset = () => {
    clearInterval(timerRef.current)
    setSeconds(0)
  }

  return (
    <>
      <h1>{seconds}s</h1>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
    </>
  )
}
```

**Why `useRef` here and not `useState`?**
If you stored the interval ID in `useState`, updating it would cause a re-render — which would mess up the timer. `useRef` stores it silently.

---

## 🎯 Auto Focus Input (Common Real World Pattern)

```jsx
function App() {
  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.focus()  // input is focused automatically on page load
  }, [])

  return <input ref={inputRef} placeholder="I am auto focused!" />
}
```

No need for `document.querySelector("input").focus()` — use refs the React way.

---

## 📊 Full Comparison Table

| | `useState` | `useRef` | Normal Variable |
|---|---|---|---|
| Persists across renders | ✅ | ✅ | ❌ |
| Triggers re-render on change | ✅ | ❌ | ❌ |
| Can access DOM elements | ❌ | ✅ | ❌ |
| Safe to display in JSX | ✅ | ❌ | ❌ |
| Use for timers/intervals | ❌ | ✅ | ❌ |

---

## 📝 Important Points from Harry's Video

- `useRef` is initialized like this: `const a = useRef(0)` — always provide an initial value
- Access and update ONLY via `.current` — `a.current`
- React's `<StrictMode>` runs component functions **twice** in development — so you might see logs firing twice. This is normal and won't happen in production. Don't remove StrictMode while developing
- You can create **multiple refs** in one component — `const btnRef = useRef()`, `const inputRef = useRef()` etc
- `useRef` is perfect for storing `setInterval` and `setTimeout` IDs because you need them to persist but don't want them to cause re-renders
- Official React docs have 4 great examples to study: Click counter, Stopwatch, Focus input, Scroll image into view

---

## 🕐 When to Use What — Decision Guide

```
Do you need to show the value on screen?
  YES → useState
  NO  → keep reading...

Does the value need to survive re-renders?
  YES → useRef
  NO  → normal variable

Do you need to touch a DOM element directly?
  YES → useRef with ref attribute
  NO  → you probably don't need useRef
```

---

## ✅ Checklist Before Moving On

- [ ] I understand why normal variables fail across re-renders
- [ ] I know `useRef` persists values WITHOUT causing re-renders
- [ ] I always use `.current` to read and update a ref
- [ ] I know NOT to display `ref.current` directly in JSX — use `useState` for that
- [ ] I can attach a ref to a DOM element using `ref={myRef}` in JSX
- [ ] I understand `useRef` and `useEffect` solve different problems and work together
- [ ] I can use `useRef` to store a timer ID for `setInterval`/`clearInterval`
- [ ] I know the decision guide — when to use `useState` vs `useRef` vs normal variable

---

## 🔗 Related Topics to Study Next

- **Exercise 8 — Stopwatch** → uses `useRef` + `useEffect` together (do this now!)
- **`useCallback`** → memoizing functions
- **`useMemo`** → memoizing values  
- **`useContext`** → sharing data across components without props
- **`useReducer`** → managing complex state (alternative to useState)
