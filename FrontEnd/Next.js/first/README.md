# Next.js Notes

## What is Next.js?

- A **framework built on top of React**, used to make large, production-ready projects
- Gives you everything in one box: routing, backend APIs, SEO, and optimized rendering

---

## Key Features

- **File-based Routing** — your folder structure defines your URLs, no extra library needed
- **Optimized Rendering** — supports SSR, SSG, and CSR out of the box
- **API Routes** — build backend endpoints directly inside your Next.js project
- **Middleware** — easy request handling and authentication

---

## Setup

```bash
npx create-next-app@latest
```

> Make sure Node.js is installed before running this command.

---

## Two Ways to Use Next.js

| Router | Status | Notes |
|---|---|---|
| **App Router** (`/app`) | ✅ Latest (use this) | Introduced in Next.js 13 |
| **Pages Router** (`/pages`) | Legacy | Still works, but outdated |

---

## File-Based Routing (App Router)

Inside the `app` folder, **every folder becomes a route** and needs a `page.jsx` inside it.

```
app/
├── page.jsx           →   localhost:3000/
├── about/
│   └── page.jsx       →   localhost:3000/about
└── contact/
    └── page.jsx       →   localhost:3000/contact
```

---

## Components

- Create reusable components inside a `components/` folder at the root
- Example: `components/Navbar.jsx`

---

## The `@` Import Alias

The `@` symbol points to the **outermost (root) directory** of your project.

```js
// ❌ Without alias — confusing relative paths
import Navbar from "../../../components/Navbar";

// ✅ With alias — clean and simple
import Navbar from "@/components/Navbar";
```

---

## Useful Imports

```js
// Client-side navigation
import { useRouter } from "next/navigation";
```

---

## Quick Recap

| Concept | What it does |
|---|---|
| `app/page.jsx` | Homepage UI |
| `app/about/page.jsx` | `/about` route |
| `layout.jsx` | Shared UI (Navbar, Footer) |
| `@/components/...` | Clean root-level imports |
| API Routes | Backend inside Next.js |