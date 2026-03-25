# Middleware in Next.js

## What is Middleware?

Middleware acts as a **guard** that intercepts every request before it reaches its destination route. It has access to both the request and response objects and can:

- Modify the request or response
- Redirect the user to a different route
- Rewrite the content silently
- Return a response directly (short-circuit)

**Common use case:** Check if a user is logged in — redirect to `/dashboard` if authenticated, otherwise redirect to `/login`.

---

## How it Works

```
Browser Request → Middleware → Route Handler → Response
                      ↓
               (can return early)
```

---

## Method 1: `redirect()` — URL changes in the browser

```js
import { NextResponse } from 'next/server'

export function middleware(request) {
  return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
  matcher: '/about/:path*',
}
```

- The browser URL **updates** to the new destination
- The user can see the redirect happened in the address bar
- Use `matcher` in `config` to specify which routes trigger the middleware (e.g. `/about/:path*` matches `/about`, `/about/team`, `/about/us/history`, etc.)

---

## Method 2: `rewrite()` — URL stays the same

```js
import { NextResponse } from 'next/server'

export function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/about')) {
    return NextResponse.rewrite(new URL('/', request.url))
  }

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.rewrite(new URL('/', request.url))
  }
}
```

- The browser URL **stays unchanged**
- The content from the target route is served silently
- Great for A/B testing, maintenance pages, or feature flags

---

## Comparison

| Method | Browser URL | Content served from |
|--------|-------------|---------------------|
| `redirect()` | Changes to new URL | Destination route |
| `rewrite()` | Stays the same | Target route (silently) |

---

## Key Points

- The middleware file must be named `middleware.js` (or `.ts`) and placed at the **root** of your project (same level as `/app` or `/pages`)
- Use `matcher` in the exported `config` to limit which routes trigger middleware
- Without a `matcher`, middleware runs on **every** request
- Use `request.nextUrl.pathname` to check the current path inside the function