# Server Components in Next.js

## Key Concepts

- Every component in Next.js is a **Server Component by default**
- Server Components are rendered on the server first, then sent as HTML to the browser
- You can do backend work (database calls, file system, etc.) directly inside a Server Component
- To make a component interactive, add `"use client"` at the very top of the file
- Client Components can be imported and used inside Server Components

## Server Component Example
```jsx
// app/page.jsx — Server Component (no "use client" needed)
import fs from "fs"

export default function Page() {
  const data = fs.readFileSync("data.json", "utf-8") // ✅ works on server
  return <h1>{data}</h1>
}
```

## Client Component Example
```jsx
// components/Counter.jsx — Client Component
"use client"

import { useState } from "react"

export default function Counter() {
  const [count, setCount] = useState(0) // ✅ works in browser
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>
}
```

## Mixing Both Together
```jsx
// app/page.jsx — Server Component importing a Client Component
import Counter from "@/components/Counter"

export default function Page() {
  return (
    <div>
      <h1>My Page</h1>
      <Counter /> {/* ✅ Client Component inside Server Component */}
    </div>
  )
}
```

## Server vs Client Components

| Feature | Server Component (default) | Client Component (`"use client"`) |
|---|---|---|
| Runs on | Server | Browser |
| `useState` / `useEffect` | ❌ | ✅ |
| `onClick`, events | ❌ | ✅ |
| Database / `fs` access | ✅ | ❌ |
| Sensitive logic | ✅ Safe | ❌ Exposed to user |
| Console log location | Terminal | Browser DevTools |