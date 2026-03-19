# Next.js Server Actions

## What Are Server Actions?

Server Actions are **functions passed directly to a form's `action` attribute**. When the form is submitted, Next.js calls that function on the server automatically — no API route, no `fetch()`, no `e.preventDefault()` needed.

---

## 1. Basic Usage (Inline Server Action)

You can define a Server Action directly inside your component:

```jsx
// app/page.jsx
import fs from "fs";

export default function Page() {

  const submitAction = async (e) => {
    "use server";                          // tells Next.js: run this on server only
    console.log(e.get("name"));            // logs in terminal, not browser
    console.log(e.get("address"));
    fs.writeFileSync("dhami.txt", "i am dhami");
  };

  return (
    <form action={submitAction}>           {/* pass function, not a URL string */}
      <input type="text" name="name" />
      <input type="text" name="address" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

> **Key point:** The `e` parameter is a `FormData` object — use `e.get("inputName")` to read values. The `name` attribute on each `<input>` is what you pass into `.get()`.

---

## 2. The `"use server"` Directive

You **must** write `"use server"` at the top of any Server Action function. This tells Next.js that this function should **only run on the server**, never in the user's browser.

Because it runs on the server, you can safely:
- Connect to a database (MongoDB, etc.)
- Read/write files using Node.js `fs`
- Access environment variables and secrets

---

## 3. Best Practice — Organize in a Separate File

Instead of writing Server Actions inside your component, keep them in a dedicated folder:

```
app/
actions/
└── form.js     ← all your server actions live here
```

```js
// actions/form.js
"use server";   // ← one directive at top means ALL functions in this file are server actions

import fs from "fs";

export async function submitAction(e) {
  const name = e.get("name");
  const address = e.get("address");

  fs.writeFileSync("dhami.txt", `${name}, ${address}`);
}
```

Then import and use in any page:

```jsx
// app/page.jsx
import { submitAction } from "@/actions/form";

export default function Page() {
  return (
    <form action={submitAction}>
      <input type="text" name="name" />
      <input type="text" name="address" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## 4. Clearing the Form After Submit (useRef)

Server Actions do **not** auto-clear the form inputs after submission. To reset them, you need client-side JS — so add `"use client"` and use `useRef`:

```jsx
"use client";

import { useRef } from "react";
import { submitAction } from "@/actions/form";

export default function Page() {
  const formRef = useRef(null);

  return (
    <form
      ref={formRef}
      action={async (e) => {
        await submitAction(e);       // run the server action
        formRef.current.reset();     // then clear the form
      }}
    >
      <input type="text" name="name" />
      <input type="text" name="address" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## Server Actions vs API Routes

| | API Routes (`route.js`) | Server Actions |
|---|---|---|
| **Setup needed** | Separate file + `fetch()` + headers | Just a function |
| **Called via** | `fetch('/api/...')` | `action={fn}` on form |
| **Best for** | Public APIs, mobile apps | Form submissions |
| **Need `fetch`?** | Yes | No |

---

## Quick Reference

| Concept | Detail |
|---|---|
| Directive | `"use server"` inside the function or at top of file |
| Form data parameter | `FormData` object (called `e` in examples) |
| Reading values | `e.get("inputName")` — matches `name` attribute on `<input>` |
| Separate file location | `actions/form.js` |
| Clearing form | `useRef` + `formRef.current.reset()` |
| Need `"use client"` for reset? | Yes, because `useRef` is a client-side hook |