# Next.js API Routes

## What is an API Route in Next.js?

Next.js is a **full-stack framework** — meaning you can build both your frontend (UI) and backend (API) inside the **same project**, without needing a separate Express server.

---

## 1. Folder Structure

Create an `api` folder inside the `app` directory. Each endpoint gets its own subfolder with a special file named **`route.js`**.

```
app/
└── api/
    └── add/
        └── route.js   ← Next.js recognizes this as an API handler
```

> **Important:** The file **must** be named `route.js`. Any other name won't work.

---

## 2. Import NextResponse

Inside `route.js`, import `NextResponse` to send JSON responses back to the client:

```js
import { NextResponse } from "next/server";
```

---

## 3. Handling HTTP Methods

Export functions named after HTTP methods — Next.js automatically routes requests to the correct one:

```js
export async function GET(request) { ... }
export async function POST(request) { ... }
export async function PUT(request) { ... }
export async function PATCH(request) { ... }
export async function DELETE(request) { ... }
```

---

## 4. Writing a POST Handler

```js
// app/api/add/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
    let data = await request.json(); // read the incoming body (like req.body in Express)
    console.log(data);

    return NextResponse.json({
        success: true,
        data                          // send data back to the frontend
    });
}
```

---

## 5. Calling the API from the Frontend

```jsx
"use client"; // required when using onClick or any browser events

export default function MyComponent() {
    const handleSubmit = async () => {
        const formData = { num1: 5, num2: 3 };

        let a = await fetch("/api/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        let res = await a.json();
        console.log(res); // { success: true, data: { num1: 5, num2: 3 } }
    };

    return <button onClick={handleSubmit}>Submit</button>;
}
```

> **Note:** The fetch URL is just `/api/add` — no `localhost:5000` needed since everything is in the same project.

---

## Quick Reference

| Concept | Detail |
|---|---|
| API file name | Must be `route.js` |
| Special import | `NextResponse` from `"next/server"` |
| Reading request body | `await request.json()` |
| Sending response | `NextResponse.json({ ... })` |
| Supported methods | GET, POST, PUT, PATCH, DELETE |
| Client directive | Add `"use client"` when using browser events |

---

## Comparison with Express

| Express | Next.js `route.js` |
|---|---|
| `app.post('/api/add', ...)` | `export async function POST(request) {}` |
| `req.body` | `await request.json()` |
| `res.json({ ... })` | `return NextResponse.json({ ... })` |
| Separate server file | Lives inside `app/api/` folder |