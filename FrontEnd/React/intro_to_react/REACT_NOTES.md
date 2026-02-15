# React Notes - Complete Beginner's Guide 📚

## Table of Contents
1. [What is React?](#what-is-react)
2. [Why Use React?](#why-use-react)
3. [Core Concepts](#core-concepts)
4. [Components](#components)
5. [Props](#props)
6. [State](#state)
7. [Hooks](#hooks)
8. [JSX](#jsx)
9. [Virtual DOM](#virtual-dom)
10. [Project Structure](#project-structure)
11. [Best Practices](#best-practices)
12. [Common Patterns](#common-patterns)

---

## What is React?

React is a **JavaScript library** (not a framework) for building user interfaces, created by Facebook (Meta) in 2013.

### Key Points:
- **Purpose**: Build interactive and dynamic user interfaces
- **Type**: Component-based library
- **Philosophy**: Declarative programming (you describe WHAT you want, not HOW to do it)
- **Use Case**: Single Page Applications (SPAs), mobile apps (React Native), desktop apps

### React vs Vanilla JavaScript
```javascript
// Vanilla JS - Imperative (HOW to do it)
const button = document.getElementById('btn');
const display = document.getElementById('count');
let count = 0;

button.addEventListener('click', () => {
  count++;
  display.textContent = count; // Manual DOM manipulation
});

// React - Declarative (WHAT you want)
const [count, setCount] = useState(0);

<button onClick={() => setCount(count + 1)}>
  Count: {count}
</button>
// React automatically updates the UI
```

---

## Why Use React?

### 1. **Component-Based Architecture**
Break your UI into small, reusable pieces (like LEGO blocks)
```jsx
<App>
  <Navbar />
  <MainContent />
  <Footer />
</App>
```

### 2. **Automatic UI Updates (Reactive)**
Change data → UI updates automatically
```jsx
setState(newValue) // React handles the rest!
```

### 3. **Reusability**
Write once, use everywhere
```jsx
<Button text="Login" />
<Button text="Sign Up" />
<Button text="Submit" />
```

### 4. **Better Performance (Virtual DOM)**
React only updates what changed, not the entire page

### 5. **Large Ecosystem**
- Tons of libraries and tools
- Huge community support
- React Native (mobile apps)
- Next.js (full-stack framework)

### 6. **Declarative Code**
Easier to read and maintain
```jsx
// You describe WHAT the UI should look like
{isLoggedIn ? <Dashboard /> : <Login />}
```

---

## Core Concepts

### The React Mental Model
1. **UI = f(state)** - Your UI is a function of your state
2. **Data flows down** - Parent → Child (via props)
3. **Events flow up** - Child → Parent (via callback functions)

---

## Components

Components are the building blocks of React apps. Think of them as custom HTML elements.

### Types of Components

#### 1. Functional Components (Modern Way)
```jsx
const Welcome = () => {
  return <h1>Hello, World!</h1>
}

export default Welcome
```

#### 2. Functional Components with Props
```jsx
const Greeting = (props) => {
  return <h1>Hello, {props.name}!</h1>
}

// Usage
<Greeting name="Dhami" />
```

#### 3. Component with Destructuring (Cleaner)
```jsx
const Greeting = ({ name, age }) => {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old</p>
    </div>
  )
}
```

### Component Rules
- ✅ Component names MUST start with a capital letter
- ✅ Must return JSX (or null)
- ✅ Can only return ONE parent element

```jsx
// ❌ Wrong - Multiple parents
const Wrong = () => {
  return (
    <h1>Title</h1>
    <p>Paragraph</p>
  )
}

// ✅ Correct - Single parent
const Correct = () => {
  return (
    <div>
      <h1>Title</h1>
      <p>Paragraph</p>
    </div>
  )
}

// ✅ Also Correct - React Fragment
const AlsoCorrect = () => {
  return (
    <>
      <h1>Title</h1>
      <p>Paragraph</p>
    </>
  )
}
```

---

## Props

**Props** (Properties) are how you pass data from parent to child components. Think of them like function arguments.

### Basic Props
```jsx
// Parent Component
const App = () => {
  return <Navbar logoText="My Website" color="blue" />
}

// Child Component
const Navbar = (props) => {
  return (
    <div style={{ color: props.color }}>
      <h1>{props.logoText}</h1>
    </div>
  )
}
```

### Props with Destructuring (Recommended)
```jsx
const Navbar = ({ logoText, color, links }) => {
  return (
    <div style={{ color }}>
      <h1>{logoText}</h1>
      <ul>
        {links.map(link => <li key={link}>{link}</li>)}
      </ul>
    </div>
  )
}

// Usage
<Navbar 
  logoText="My Site" 
  color="red" 
  links={['Home', 'About', 'Contact']} 
/>
```

### Default Props
```jsx
const Button = ({ text = "Click Me", color = "blue" }) => {
  return <button style={{ backgroundColor: color }}>{text}</button>
}

// If no props passed, uses defaults
<Button /> // Shows "Click Me" with blue background
```

### Props are Read-Only
```jsx
// ❌ NEVER do this
const Navbar = (props) => {
  props.logoText = "New Text" // ERROR! Props are immutable
}
```

### Passing Functions as Props
```jsx
// Parent
const App = () => {
  const handleClick = () => {
    alert('Button clicked!')
  }
  
  return <Button onClick={handleClick} />
}

// Child
const Button = ({ onClick }) => {
  return <button onClick={onClick}>Click Me</button>
}
```

---

## State

**State** is data that can change over time. When state changes, React re-renders the component.

### State vs Props
| State | Props |
|-------|-------|
| Mutable (can change) | Immutable (cannot change) |
| Managed within component | Passed from parent |
| Use `useState` hook | Received as function parameter |

### Using useState Hook
```jsx
import { useState } from 'react'

const Counter = () => {
  // Declare state
  const [count, setCount] = useState(0)
  //     ↑         ↑            ↑
  //   value   setter    initial value
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  )
}
```

### Multiple State Variables
```jsx
const Form = () => {
  const [name, setName] = useState('')
  const [age, setAge] = useState(0)
  const [email, setEmail] = useState('')
  
  return (
    <form>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Name"
      />
      <input 
        value={age} 
        onChange={(e) => setAge(e.target.value)} 
        placeholder="Age"
      />
      <input 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email"
      />
    </form>
  )
}
```

### State with Objects
```jsx
const Profile = () => {
  const [user, setUser] = useState({
    name: 'Dhami',
    age: 25,
    email: 'dhami@example.com'
  })
  
  const updateName = (newName) => {
    setUser({
      ...user,        // Spread existing properties
      name: newName   // Update only name
    })
  }
  
  return <div>{user.name}</div>
}
```

### State with Arrays
```jsx
const TodoList = () => {
  const [todos, setTodos] = useState(['Learn React', 'Build Project'])
  
  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]) // Add to end
  }
  
  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index))
  }
  
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>
          {todo}
          <button onClick={() => removeTodo(index)}>Delete</button>
        </li>
      ))}
    </ul>
  )
}
```

### Important State Rules
1. **Never mutate state directly**
```jsx
// ❌ Wrong
count = count + 1

// ✅ Correct
setCount(count + 1)
```

2. **State updates are asynchronous**
```jsx
setCount(count + 1)
console.log(count) // Still shows old value!
```

3. **Use functional updates when new state depends on old state**
```jsx
// ❌ Can cause bugs
setCount(count + 1)

// ✅ Better
setCount(prevCount => prevCount + 1)
```

---

## Hooks

Hooks are special functions that let you "hook into" React features.

### Rules of Hooks
1. ✅ Only call hooks at the **top level** (not inside loops, conditions, or nested functions)
2. ✅ Only call hooks in **React functional components** or **custom hooks**

### Common Hooks

#### 1. useState - Manage State
```jsx
const [value, setValue] = useState(initialValue)
```

#### 2. useEffect - Side Effects
Run code after render (API calls, timers, subscriptions)
```jsx
import { useEffect } from 'react'

const App = () => {
  const [data, setData] = useState(null)
  
  // Runs after every render
  useEffect(() => {
    console.log('Component rendered')
  })
  
  // Runs only once (on mount)
  useEffect(() => {
    fetchData()
  }, []) // Empty dependency array
  
  // Runs when 'count' changes
  useEffect(() => {
    console.log('Count changed!')
  }, [count]) // Dependency array
  
  return <div>{data}</div>
}
```

#### 3. useRef - Access DOM Elements
```jsx
import { useRef } from 'react'

const InputFocus = () => {
  const inputRef = useRef(null)
  
  const focusInput = () => {
    inputRef.current.focus()
  }
  
  return (
    <>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus Input</button>
    </>
  )
}
```

---

## JSX

**JSX** (JavaScript XML) is a syntax extension that looks like HTML but is actually JavaScript.

### JSX Rules

#### 1. All tags must close
```jsx
// ❌ Wrong
<input type="text">
<img src="logo.png">

// ✅ Correct
<input type="text" />
<img src="logo.png" />
```

#### 2. Use className instead of class
```jsx
// ❌ Wrong
<div class="container"></div>

// ✅ Correct
<div className="container"></div>
```

#### 3. Use camelCase for attributes
```jsx
// ❌ Wrong
<button onclick={handleClick}>Click</button>

// ✅ Correct
<button onClick={handleClick}>Click</button>
```

#### 4. JavaScript expressions in curly braces
```jsx
const name = 'Dhami'
const age = 25

<div>
  <h1>Hello, {name}!</h1>
  <p>You are {age} years old</p>
  <p>Next year you'll be {age + 1}</p>
</div>
```

#### 5. Conditional Rendering
```jsx
// Ternary operator
{isLoggedIn ? <Dashboard /> : <Login />}

// Logical AND
{isLoggedIn && <Dashboard />}

// If-else with variable
let content
if (isLoggedIn) {
  content = <Dashboard />
} else {
  content = <Login />
}

return <div>{content}</div>
```

#### 6. Lists and Keys
```jsx
const fruits = ['Apple', 'Banana', 'Orange']

<ul>
  {fruits.map((fruit, index) => (
    <li key={index}>{fruit}</li>
  ))}
</ul>

// Better: Use unique IDs as keys
const todos = [
  { id: 1, text: 'Learn React' },
  { id: 2, text: 'Build Project' }
]

<ul>
  {todos.map(todo => (
    <li key={todo.id}>{todo.text}</li>
  ))}
</ul>
```

---

## Virtual DOM

### What is the DOM?
**DOM** (Document Object Model) is a tree structure representing your webpage.

### The Problem with Real DOM
Updating the real DOM is **slow** because:
1. Browser has to recalculate styles
2. Browser has to repaint the screen
3. Updating entire elements is expensive

### How Virtual DOM Works

1. **Initial Render**: React creates a Virtual DOM (lightweight copy)
2. **State Changes**: React creates a NEW Virtual DOM
3. **Diffing**: React compares old vs new Virtual DOM
4. **Reconciliation**: React updates ONLY what changed in the real DOM

```
State Changes
     ↓
New Virtual DOM created
     ↓
Compare with old Virtual DOM (Diffing)
     ↓
Calculate minimum changes needed
     ↓
Update only changed parts in Real DOM
```

### Example
```jsx
// State changes from 5 to 6
const [count, setCount] = useState(5)

<div>
  <h1>Counter App</h1>
  <p>Count: {count}</p>  {/* Only this line changes */}
  <button>Click</button>
</div>

// React only updates the <p> tag, not the entire <div>
```

---

## Project Structure

### Basic React App Structure
```
my-app/
├── node_modules/        # Dependencies (don't touch)
├── public/
│   ├── index.html      # Main HTML file
│   └── favicon.ico     # Website icon
├── src/
│   ├── components/     # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── Button.jsx
│   ├── App.jsx         # Main app component
│   ├── App.css         # Styles
│   └── index.js        # Entry point
├── package.json        # Project dependencies
└── README.md
```

### Component File Naming
```
// ✅ Good naming
Navbar.jsx
UserProfile.jsx
TodoList.jsx

// ❌ Bad naming
navbar.jsx
userprofile.jsx
todo-list.jsx
```

---

## Best Practices

### 1. Component Organization
```jsx
// ✅ One component per file
// Navbar.jsx
const Navbar = () => { /* ... */ }
export default Navbar

// ❌ Multiple components in one file (avoid)
```

### 2. Destructure Props
```jsx
// ✅ Clean
const User = ({ name, age, email }) => {
  return <div>{name}</div>
}

// ❌ Verbose
const User = (props) => {
  return <div>{props.name}</div>
}
```

### 3. Use Fragments to Avoid Extra Divs
```jsx
// ✅ No extra DOM node
const App = () => {
  return (
    <>
      <Header />
      <Main />
    </>
  )
}

// ❌ Unnecessary div
const App = () => {
  return (
    <div>
      <Header />
      <Main />
    </div>
  )
}
```

### 4. Keep Components Small
```jsx
// ✅ Good - Single responsibility
const LoginButton = ({ onClick }) => {
  return <button onClick={onClick}>Login</button>
}

// ❌ Too big - Does too much
const Navbar = () => {
  // 200 lines of code...
}
```

### 5. Use Meaningful Names
```jsx
// ✅ Clear purpose
const isLoggedIn = true
const handleSubmit = () => {}
const userData = {}

// ❌ Unclear
const flag = true
const func = () => {}
const data = {}
```

### 6. Avoid Inline Functions in JSX (for performance)
```jsx
// ❌ Creates new function on every render
<button onClick={() => console.log('clicked')}>Click</button>

// ✅ Define once
const handleClick = () => console.log('clicked')
<button onClick={handleClick}>Click</button>
```

---

## Common Patterns

### 1. Conditional Styling
```jsx
const Button = ({ isPrimary }) => {
  return (
    <button 
      className={isPrimary ? 'btn-primary' : 'btn-secondary'}
    >
      Click Me
    </button>
  )
}

// Dynamic styles
const Box = ({ isActive }) => {
  return (
    <div style={{
      backgroundColor: isActive ? 'green' : 'gray',
      padding: '20px'
    }}>
      Content
    </div>
  )
}
```

### 2. Form Handling
```jsx
const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault() // Prevent page reload
    console.log({ email, password })
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  )
}
```

### 3. Loading States
```jsx
const DataFetcher = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])
  
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  
  return <div>{JSON.stringify(data)}</div>
}
```

### 4. Lifting State Up (Child to Parent Communication)
```jsx
// Parent
const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  
  return (
    <>
      <SearchBar onSearch={setSearchTerm} />
      <Results searchTerm={searchTerm} />
    </>
  )
}

// Child
const SearchBar = ({ onSearch }) => {
  return (
    <input 
      onChange={(e) => onSearch(e.target.value)}
      placeholder="Search..."
    />
  )
}
```

---

## Quick Reference

### Creating a React App
```bash
# Using Vite (recommended - faster)
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev

# Using Create React App (older method)
npx create-react-app my-app
cd my-app
npm start
```

### Essential Commands
```bash
npm install          # Install dependencies
npm run dev          # Start development server (Vite)
npm start            # Start development server (CRA)
npm run build        # Build for production
```

### Import/Export Syntax
```jsx
// Named export
export const Button = () => {}
import { Button } from './Button'

// Default export
export default Button
import Button from './Button'

// Import CSS
import './App.css'

// Import image
import logo from './logo.png'
```

---

## Common Mistakes to Avoid

1. ❌ Modifying state directly
2. ❌ Forgetting keys in lists
3. ❌ Not using functional updates for state
4. ❌ Infinite loops in useEffect
5. ❌ Using wrong attribute names (class vs className)
6. ❌ Not closing self-closing tags

---

## Next Steps

1. ✅ Master Components, Props, and State
2. ✅ Learn useEffect for side effects
3. ✅ Practice building small projects
4. ✅ Learn React Router (for multi-page apps)
5. ✅ Learn about Context API (state management)
6. ✅ Explore libraries: Redux, React Query, etc.

---

## Resources

- **Official Docs**: https://react.dev
- **Interactive Tutorial**: https://react.dev/learn
- **CodeWithHarry**: YouTube channel (Hindi tutorials)
- **Practice**: Build 5-10 small projects before moving to advanced topics

---

## Your Learning Path

```
Week 1-2: Components, Props, JSX
   ↓
Week 3-4: State, useState, Event Handling
   ↓
Week 5-6: useEffect, Lifecycle, API calls
   ↓
Week 7-8: Forms, Routing (React Router)
   ↓
Week 9-10: Build 3-5 projects
   ↓
Advanced: Context API, Redux, TypeScript
```

---

**Remember**: The best way to learn React is by **building projects**. Start small, make mistakes, and gradually increase complexity!

Happy Coding! 🚀
