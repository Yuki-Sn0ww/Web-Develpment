# ⚛️ React Fundamentals — Revision Notes

> Based on CodeWithHarry's React tutorial covering Vite setup, Components, JSX, and Props.

---

## 📁 Table of Contents

1. [Project Setup with Vite](#1-project-setup-with-vite)
2. [Understanding Components](#2-understanding-components)
3. [JSX — JavaScript XML](#3-jsx--javascript-xml)
4. [Props — Passing Data](#4-props--passing-data)
5. [Styling in React](#5-styling-in-react)
6. [Full App Structure](#6-full-app-structure)
7. [Quick Cheat Sheet](#7-quick-cheat-sheet)

---

## 1. Project Setup with Vite

### Why Vite over `create-react-app`?
- Vite is **much faster** — it uses native ES modules in the browser during development
- `create-react-app` bundles everything upfront (slow), Vite does it on demand (fast)

### Setup Commands

```bash
# Step 1 — Create the project
npm create vite@latest

# Step 2 — Move into the folder and install dependencies
npm install

# Step 3 — Start the development server (runs at localhost:5173)
npm run dev
```

### Folder Structure After Setup

```
my-app/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Navbar.css
│   │   ├── Card.jsx
│   │   ├── Card.css
│   │   └── Footer.jsx
│   ├── App.jsx       ← Main entry point
│   └── main.jsx
├── index.html
└── package.json
```

---

## 2. Understanding Components

### What is a Component?
- A **component** is just a **JavaScript function** that returns JSX
- They are the building blocks of every React app
- Each component handles one specific piece of the UI (e.g., Navbar, Card, Footer)

### Rules for Components
- Function name must start with a **Capital Letter** (e.g., `Card`, not `card`)
- Must return **JSX**
- Must be **exported** so other files can use it

### Example — Navbar Component

```jsx
import React from 'react'
import "./Navbar.css"

const Navbar = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
```

### Using a Component in App.jsx

```jsx
import Navbar from "./components/Navbar"

function App() {
  return (
    <>
      <Navbar />   {/* Use like a custom HTML tag */}
    </>
  )
}
```

---

## 3. JSX — JavaScript XML

### What is JSX?
- JSX lets you write **HTML-like syntax inside JavaScript**
- It is NOT real HTML — it compiles to `React.createElement()` calls behind the scenes
- Files using JSX should have the `.jsx` extension

### ⚠️ JSX Rules (Very Important!)

#### Rule 1 — Single Root Element
Every component must return only **one top-level element**. Use an empty Fragment `<>...</>` to wrap multiple elements.

```jsx
// ❌ WRONG — two siblings at the top level
return (
  <Navbar />
  <div>Content</div>
)

// ✅ CORRECT — wrapped in a Fragment
return (
  <>
    <Navbar />
    <div>Content</div>
  </>
)
```

#### Rule 2 — Self-Closing Tags
All tags must be properly closed.

```jsx
// ❌ WRONG
<img>
<input>
<br>

// ✅ CORRECT
<img />
<input />
<br />
```

#### Rule 3 — `className` not `class`
`class` is a reserved word in JavaScript (used for ES6 classes), so JSX uses `className`.

```jsx
// ❌ WRONG
<div class="card">

// ✅ CORRECT
<div className="card">
```

#### Rule 4 — Curly Braces `{}` for JavaScript
To run any JavaScript expression inside JSX, wrap it in `{}`.

```jsx
const name = "Harry"

return <h1>Hello, {name}!</h1>          // Variables
return <p>{2 + 2}</p>                   // Math
return <p>{props.description}</p>       // Props
return <img width={333} />              // Numbers (not strings)
```

---

## 4. Props — Passing Data

### What are Props?
- **Props (Properties)** allow you to pass data **from a parent to a child component**
- They make components **reusable** — same component, different data
- Props are **read-only** — a child cannot modify props it receives

### How Props Work — 3 Steps

#### Step 1 — Pass props from the Parent (`App.jsx`)

```jsx
<Card title="card 1" description="card 1 desc" />
<Card title="card 2" description="card 2 desc" />
<Card title="card 3" description="card 3 desc" />
<Card title="card 4" description="card 4 desc" />
```

Here, `title` and `description` are the props you are passing.

#### Step 2 — Receive props in the Child (`Card.jsx`)

```jsx
const Card = (props) => {
  return (
    <div className='card'>
      <h1>{props.title}</h1>
      <p>{props.description}</p>
    </div>
  )
}
```

Behind the scenes, `props` is just a JavaScript object:

```js
// What React passes to Card when you write:
// <Card title="card 1" description="card 1 desc" />

props = {
  title: "card 1",
  description: "card 1 desc"
}
```

#### Step 3 — Access with `props.propertyName`

```jsx
props.title        // "card 1"
props.description  // "card 1 desc"
```

### Full Card Component Example

```jsx
import React from 'react'
import "./Card.css"

const Card = (props) => {
  return (
    <div className='card' style={{ overflow: "hidden" }}>
      <img
        src="https://cdn.shopify.com/..."
        alt=""
        width={333}
        style={{ border: "2px solid black" }}
      />
      <h1>{props.title}</h1>
      <p>{props.description}</p>
    </div>
  )
}

export default Card
```

---

## 5. Styling in React

### Method 1 — External CSS File (Recommended)
Create a `.css` file for each component and import it.

```jsx
// In Card.jsx
import "./Card.css"

// Then use className as normal
<div className="card">
```

```css
/* In Card.css */
.card {
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 8px;
}
```

### Method 2 — Inline Styles
Pass styles as a **JavaScript object** directly in JSX.

```jsx
// Double curly braces: outer {} = JSX expression, inner {} = JS object
<div style={{ overflow: "hidden", backgroundColor: "lightblue" }}>

<img style={{ border: "2px solid black" }} />
```

### ⚠️ Inline Style Rules
- Properties are written in **camelCase** (not kebab-case like CSS)
- Values are **strings** (or numbers for unitless values like `width`)

| CSS Property     | JSX Inline Style     |
|------------------|----------------------|
| `background-color` | `backgroundColor`  |
| `font-size`        | `fontSize`         |
| `border-radius`    | `borderRadius`     |
| `padding-top`      | `paddingTop`       |

---

## 6. Full App Structure

### `App.jsx` — The Root Component

```jsx
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import Card from "./components/Card"

function App() {
  return (
    <>
      <Navbar />
      <div className="cards">
        <Card title="card 1" description="card 1 desc" />
        <Card title="card 2" description="card 2 desc" />
        <Card title="card 3" description="card 3 desc" />
        <Card title="card 4" description="card 4 desc" />
      </div>
      <Footer />
    </>
  )
}

export default App
```

### Data Flow Diagram

```
App.jsx (Parent)
│
├──  <Navbar />          → No props (static content)
│
├──  <Card title="card 1" description="card 1 desc" />
├──  <Card title="card 2" description="card 2 desc" />   → Same component,
├──  <Card title="card 3" description="card 3 desc" />      different props
├──  <Card title="card 4" description="card 4 desc" />
│
└──  <Footer />          → No props (static content)
```

### Workflow to Build a New Component

```
1. Create the file      →  Card.jsx
2. Write the JSX        →  Define the UI structure
3. Accept props         →  const Card = (props) => { ... }
4. Use props in JSX     →  {props.title}
5. Export it            →  export default Card
6. Import in App.jsx    →  import Card from "./components/Card"
7. Use with data        →  <Card title="..." description="..." />
```

---

## 7. Quick Cheat Sheet

| Concept | Key Point |
|---|---|
| **Vite setup** | `npm create vite@latest` → `npm install` → `npm run dev` |
| **Component** | A function that returns JSX, name must start with Capital |
| **JSX root** | Must have ONE root element — use `<>...</>` Fragment |
| **Self-close** | All tags must close: `<img />`, `<br />`, `<input />` |
| **CSS class** | Use `className`, not `class` |
| **JS in JSX** | Wrap in curly braces: `{expression}` |
| **Props** | Pass: `<Card title="x" />` — Receive: `props.title` |
| **Inline style** | `style={{ backgroundColor: "red" }}` (camelCase!) |
| **Export** | `export default ComponentName` at bottom of file |
| **Import** | `import Card from "./components/Card"` |

---

> 💡 **Revision Tip:** The core idea of React is — build small reusable components, pass data via props, and compose everything together in `App.jsx`.
