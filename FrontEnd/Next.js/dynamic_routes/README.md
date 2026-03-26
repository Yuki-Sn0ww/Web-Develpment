# Dynamic Routes in Next.js

## Table of Contents
1. [Blog Listing Page](#1-blog-listing-page)
2. [Dynamic Blog Post Page (Slug)](#2-dynamic-blog-post-page-slug)
3. [Custom 404 — Not Found Page](#3-custom-404--not-found-page)
4. [Error Boundary Page](#4-error-boundary-page)
5. [Catch-All Routes](#5-catch-all-routes)

---

## 1. Blog Listing Page

Create a static blog listing page:

```
app/blog/page.js
```

This renders at the route `/blog` and serves as the entry point for your blog section.

---

## 2. Dynamic Blog Post Page (Slug)

Create a dynamic route for individual blog posts using square brackets:

```
app/blogpost/[slug]/page.js
```

```jsx
export default async function Page({ params }) {
  const { slug } = await params;
  const languages = [
    "JavaScript", "Python", "Java", "C", "C++", "C#",
    "Go", "Rust", "Kotlin", "Swift", "TypeScript",
    "PHP", "Ruby", "Dart", "R",
  ];

  if (languages.includes(slug)) {
    return <div>My Post: {slug}</div>;
  } else {
    return <div>not found</div>;
  }
}
```

> **Note:** In the App Router, you get `slug` directly from `params` — no `useRouter()` needed. `params` is async in Next.js 15+, so always `await` it.

**Examples:**
| URL | `slug` value |
|-----|-------------|
| `/blogpost/JavaScript` | renders `My Post: JavaScript` |
| `/blogpost/unknownlang` | renders `not found` |

---

## 3. Custom 404 — Not Found Page

Add a custom Not Found page:

```
app/not-found.js
```

```jsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}
```

> **Note:** This page is automatically shown when `notFound()` is called from a Server Component, or when no route matches.

---

## 4. Error Boundary Page

Create a client-side error boundary to gracefully handle runtime errors:

```
app/error.js
```

```jsx
'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'

export default function Error({ error, unstable_retry }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => unstable_retry()}>
        Try again
      </button>
    </div>
  )
}
```

> **Note:** When an error occurs, the user can click **"Try again"** to re-fetch and re-render the segment — recovering without a full page reload.

---

## 5. Catch-All Routes

Capture multiple URL segments into an array using `[...param]`:

```
app/about/[...val]/page.js
```

```jsx
export default function Page({ params }) {
  console.log(params)
  return <div>This is val</div>
}
```

**How it works:**

| URL | `params.val` |
|-----|-------------|
| `/about/harry` | `["harry"]` |
| `/about/harry/one` | `["harry", "one"]` |
| `/about/harry/one/two` | `["harry", "one", "two"]` |

> **Note:** Every segment after `/about/` gets collected into an array — useful for deeply nested or variable-length routes.

---

## Summary

| File | Purpose |
|------|---------|
| `app/blog/page.js` | Static blog listing page |
| `app/blogpost/[slug]/page.js` | Dynamic route — single segment |
| `app/not-found.js` | Custom 404 page |
| `app/error.js` | Error boundary with retry |
| `app/about/[...val]/page.js` | Catch-all route — multiple segments |