# Handling Forms in React

## What is React Hook Form?

A library that handles **form state, validation, and submission** with almost zero boilerplate code.

---

## Installation & Setup

```bash
npm install react-hook-form
```

```js
import { useForm } from "react-hook-form"
```

---

## The `useForm()` Hook

`useForm()` returns a big object. We unpack it using basic JS destructuring:

```js
const {
  register,
  handleSubmit,
  setError,
  formState: { errors, isSubmitting },
} = useForm()
```

| Tool | Purpose |
|------|---------|
| `register` | Connects inputs to react-hook-form |
| `handleSubmit` | Validates data, then passes it to your function |
| `setError` | Manually trigger errors (e.g. from server) |
| `errors` | Object holding all current error messages |
| `isSubmitting` | `true` while form is being submitted |

---

## Connecting Inputs with `register`

`register` connects an input to the library. The `...` (spread operator) is used to pass every key in the returned object as **individual props**, not as one whole object:

```jsx
<input {...register("username")} />

// Same as writing:
<input
  name="username"
  ref={someFunction}
  onChange={someFunction}
  onBlur={someFunction}
/>
```

---

## Form Submission Flow

```jsx
<form onSubmit={handleSubmit(onSubmit)}>
```

1. User clicks submit
2. `handleSubmit` (built-in) validates all fields
3. **If errors** → displays error messages, stops
4. **If valid** → collects all values and passes to your `onSubmit` function

---

## Validation Rules

```jsx
{...register("username", {
  required:  { value: true, message: "This field is required" },
  minLength: { value: 3,    message: "Min length is 3" },
  maxLength: { value: 8,    message: "Max length is 8" }
})}

{errors.username && <div>{errors.username.message}</div>}
```

---

## Sending Data to Backend (Fetch API)

Inside `onSubmit`, we send data to the backend using `fetch`:

```js
const onSubmit = async (data) => {
  let r = await fetch("http://localhost:3000/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)   // convert JS object → string
  })
  let res = await r.text()       // read response from server
  console.log(data, res)
}
```

> `JSON.stringify` is needed because `fetch` can only send **strings**, not JS objects.

---

## Backend — Express Server (`server.js`)

```js
import express    from 'express'
import cors       from 'cors'
import bodyParser from 'body-parser'

const app  = express()
const port = 3000

app.use(cors())            // allow requests from different ports
app.use(bodyParser.json()) // convert incoming string → JS object

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', (req, res) => {
  console.log(req.body)  // { username: "...", password: "...", email: "..." }
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
```

---

## Why `cors`?

React runs on port **5173**, Express on port **3000**. Different ports = different origins. The browser **blocks** this by default.

```js
app.use(cors())
// Tells browser: "This request is allowed" ✅
```

---

## Why `bodyParser`?

React sends data as a **string** (via `JSON.stringify`). `bodyParser.json()` converts it back to a JS object so you can use `req.body`.

```
String arrives  →  bodyParser.json()  →  req.body = { username: "...", ... }
```

> Both `cors` and `bodyParser` are **middleware** — every request passes through them **before** reaching your route handler.

---

## Complete Data Flow

```
User fills form
      ↓
handleSubmit validates all fields
      ↓
onSubmit(data) called
      ↓
JSON.stringify converts object → string
      ↓
fetch sends POST request to localhost:3000
      ↓
cors()       → allows the request
bodyParser() → converts string back to object
      ↓
req.body = form data available in Express
      ↓
res.send() sends response back to React
      ↓
r.text() reads the response in React
```