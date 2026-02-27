# Conditional Rendering & Rendering Lists in React

> 📹 Based on Harry's video: [Watch Here](https://youtu.be/96DGjqlAIxs)
> 
> Topics covered: Conditional Rendering, List Rendering, key Prop, Tailwind CSS Setup with Vite

---

## 🚀 Project Setup

```bash
npm create vite@latest
# Select: React → JavaScript
npm install
npm run dev
```

This exposes your app on `localhost` with hot module replacement (HMR).

---

## 1. State Setup

Before doing any conditional rendering, Harry sets up two states:

```js
const [showbtn, setshowbtn] = useState(false)   // boolean state
const [todos, setTodos] = useState([             // array state
  { title: "Hey", desc: "I am a good todo" },
  { title: "Hey Another todo", desc: "I am a good todo too" },
  { title: "Hey I am grocery todo", desc: "I am a good todo but I am grocery todo" },
])
```

- `showbtn` is a **boolean** that controls whether a button is visible or not
- `todos` is an **array of objects** that we will render as a list

---

## 2. Conditional Rendering — `&&` (Logical AND)

**Use when:** You want to show something if a condition is **true**, and show **nothing** if it is **false** (simple `if`, no `else`)

### Syntax
```jsx
{condition && <Component />}
```

### Example from Code
```jsx
{showbtn && <button>showbtn is true</button>}
```

### How it works
- If `showbtn` is `true` → button renders ✅
- If `showbtn` is `false` → nothing renders (React ignores it) ❌

### What Harry says
> *"Agar showbtn true hai toh dikha do, warna kuch mat karo."*
> 
> This translates to: **if showbtn is true → show this, otherwise do nothing.**

---

## 3. Conditional Rendering — Ternary Operator (`? :`)

**Use when:** You want to show **one thing** if true, and a **different thing** if false (full `if-else`)

### Syntax
```jsx
{condition ? <ComponentIfTrue /> : <ComponentIfFalse />}
```

### Example from Code
```jsx
{showbtn ? <button>showbtn is true</button> : <button>showbtn is false</button>}
```

### How it works
- If `showbtn` is `true` → first button renders ✅
- If `showbtn` is `false` → second button renders ✅

### What Harry says
> *"Jab aapko if-else dono chahiye, tab ternary use karo."*

---

## ✅ Quick Comparison — Which one to use?

| Scenario | Use |
|---|---|
| Show something **OR nothing** | `condition && <A />` |
| Show something **OR something else** | `condition ? <A /> : <B />` |

> 💡 Harry says: *"Dono yaad rakhne hain"* — you'll use both constantly in real React apps.

---

## 4. Toggle Button

Harry wires up a button to flip `showbtn` between `true` and `false`:

```jsx
<button onClick={() => setshowbtn(!showbtn)}>
  Toggle showbtn
</button>
```

- `!showbtn` flips the boolean — `true` becomes `false`, `false` becomes `true`
- Every click triggers a re-render and switches which button is shown

---

## 5. Rendering Lists with `.map()`

**The Problem:** You cannot use a regular `for` loop directly inside JSX templates.

**The Solution:** Use JavaScript's `.map()` method.

### What Harry says
> *"React mein ek list ko render karne ke liye ek special technique ka istemal hum karte hain — aur woh hai .map() method."*

### Syntax
```jsx
{array.map(item => {
  return <Component key={item.id} />
})}
```

### Example from Code
```jsx
{todos.map(todo => {
  return (
    <div key={todo.title} className="m-4 border border-1 border-purple-400">
      <div className="todo">{todo.title}</div>
      <div className="todo">{todo.desc}</div>
    </div>
  )
})}
```

### How it works
- `.map()` loops over every object in `todos`
- For each `todo`, it returns a JSX `<div>` card
- 3 todos in array → 3 cards rendered on screen automatically

---

## 6. The `key` Prop

### The Warning
When you render a list without a `key`, React throws this console warning:
```
Each child in a list should have a unique "key" prop
```

### Why it matters
React needs a unique `key` on each list item to efficiently track:
- Which items **changed**
- Which items were **added**
- Which items were **removed**

during re-renders.

### Example
```jsx
<div key={todo.title}>...</div>
```

### Best Practices (what Harry says)

| Option | When to use |
|---|---|
| `key={todo.title}` | OK for practice/demo (if titles are unique) |
| `key={todo.id}` | ✅ Ideal — use a database ID |
| Generate unique ID | When your data has no unique field |

> 💡 Harry says: *"Agar unique cheez aapke paas nahi hai toh pehle apne data mein unique cheez daalo, phir React ko do."*

---

## 7. Inline Component (inside same file)

Harry shows that you can define a small component inside the same file:

```jsx
const Todo = ({ todo }) => {
  return (
    <>
      <div className="m-4 border border-1 border-purple-400">
        <div className="todo">{todo.title}</div>
        <div className="todo">{todo.desc}</div>
      </div>
    </>
  )
}
```

And use it inside `.map()`:

```jsx
{todos.map(todo => {
  return <Todo key={todo.title} todo={todo} />
})}
```

> ⚠️ Harry says: *"Aideally aisa nahi karte hain hum."* — In real projects, components should have their **own separate files** inside a `components/` folder.

---

## 8. ⚠️ Common `return` Mistake

This is a **very common beginner error** Harry warns about.

### ❌ WRONG — pressing Enter after `return`
```jsx
// JavaScript auto-inserts semicolon here → returns undefined → nothing renders
return
  <div>...</div>
```

### ✅ CORRECT — parenthesis on same line as return
```jsx
return (
  <div>...</div>
)
```

### ✅ ALSO CORRECT — tag on same line as return
```jsx
return <div>...</div>
```

> 💡 **Rule:** Always keep the opening tag or `(` on the **same line** as `return`.

---

## 9. Tailwind CSS Setup with Vite

Harry shows a common mistake people make when setting up Tailwind with Vite.

### ❌ Common Mistake
Following the generic Tailwind installation (not the Vite-specific one).

### ✅ Correct Way
Always go to **Framework Guides → Vite** on the Tailwind website. This includes installing:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

> 💡 Harry says: *"Jo bhi framework aap use kar rahe ho, uska Framework Guide zaroor dekho."*

The `postcss` and `autoprefixer` packages are **required** specifically for Vite — without them Tailwind won't work.

---

## 📌 3 Key Takeaways (Harry's Summary)

Harry wraps up the video with exactly 3 points:

### 1️⃣ `&&` for simple if (no else)
```jsx
{showbtn && <button>Show only if true</button>}
```

### 2️⃣ `? :` for if-else
```jsx
{showbtn ? <button>True</button> : <button>False</button>}
```

### 3️⃣ `.map()` with unique `key` for lists
```jsx
{todos.map(todo => (
  <div key={todo.title}>
    {todo.title}
  </div>
))}
```

> 💡 Harry says these 3 patterns will be used in **almost every big React app you build.**

---

## 📁 Final Code Reference

```jsx
import { useState } from 'react'
import './App.css'

function App() {
  const [showbtn, setshowbtn] = useState(false)
  const [todos, setTodos] = useState([
    { title: "Hey", desc: "I am a good todo" },
    { title: "Hey Another todo", desc: "I am a good todo too" },
    { title: "Hey I am grocery todo", desc: "I am a good todo but I am grocery todo" },
  ])

  return (
    <>
      {/* Ternary — if-else */}
      {showbtn ? <button>showbtn is true</button> : <button>showbtn is false</button>}

      {/* && — if only (commented out) */}
      {/* {showbtn && <button>showbtn is true</button>} */}

      {/* List rendering with .map() */}
      {todos.map(todo => {
        return (
          <div key={todo.title} className="m-4 border border-1 border-purple-400">
            <div className="todo">{todo.title}</div>
            <div className="todo">{todo.desc}</div>
          </div>
        )
      })}

      {/* Toggle button */}
      <div className="card">
        <button onClick={() => setshowbtn(!showbtn)}>
          Toggle showbtn
        </button>
      </div>
    </>
  )
}

export default App
```
