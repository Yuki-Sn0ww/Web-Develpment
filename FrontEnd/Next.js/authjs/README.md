# Auth.js / NextAuth.js Setup Guide
> GitHub OAuth authentication for Next.js App Router

---

## Table of Contents
1. [Installation](#1-installation)
2. [Create the API Route](#2-create-the-api-route)
3. [Configure the GitHub Provider](#3-configure-the-github-provider)
4. [Set Up SessionProvider](#4-set-up-sessionprovider)
5. [Add Sign In / Sign Out UI](#5-add-sign-in--sign-out-ui)
6. [Environment Variables](#6-environment-variables)
7. [Get GitHub OAuth Credentials](#7-get-github-oauth-credentials)

---

## 1. Installation

```bash
npm install next-auth
```

---

## 2. Create the API Route

Inside your `app` directory, create this exact folder structure:

```
app/
└── api/
    └── auth/
        └── [...nextauth]/
            └── route.js
```

> **Note:** `[...nextauth]` is a catch-all route — it handles all auth URLs like `/api/auth/signin`, `/api/auth/callback/github`, etc.

---

## 3. Configure the GitHub Provider

Inside `route.js`, paste the following:

```js
import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
})

export { handler as GET, handler as POST }
```

> **Note:** In the App Router you must export the handler as both `GET` and `POST` — not as a default export like shown in the Pages Router docs.

---

## 4. Set Up SessionProvider

`SessionProvider` is a Client Component, so it **cannot** be used directly in `layout.js`.

**Step 1 — Create `app/SessionWrapper.js`:**

```js
'use client'
import { SessionProvider } from 'next-auth/react'

const SessionWrapper = ({ children }) => {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default SessionWrapper
```

**Step 2 — Use it in `layout.js`:**

```js
import SessionWrapper from './SessionWrapper'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SessionWrapper>
          {children}
        </SessionWrapper>
      </body>
    </html>
  )
}
```

---

## 5. Add Sign In / Sign Out UI

In your `page.js`, add `"use client"` at the top and use the NextAuth hooks:

```js
'use client'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Component() {
  const { data: session } = useSession()

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }

  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}
```

### Key Hooks

| Hook | Description |
|------|-------------|
| `useSession()` | Returns the logged-in user's data (name, email, image) |
| `signIn('github')` | Starts the GitHub login flow |
| `signOut()` | Logs the user out |

---

## 6. Environment Variables

Create a `.env.local` file in the **root** of your project:

```env
GITHUB_ID=your_github_client_id_here
GITHUB_SECRET=your_github_client_secret_here
```

> **Tip:** Never hardcode secrets in your code. Add `.env.local` to `.gitignore` so it is never pushed to GitHub.

---

## 7. Get GitHub OAuth Credentials

1. Go to **GitHub Settings**
2. Navigate to **Developer Settings → OAuth Apps → New OAuth App**
3. Fill in the fields:
   - **Homepage URL:** `http://localhost:3000`
   - **Authorization Callback URL:** `http://localhost:3000/api/auth/callback/github`
4. Click **Register Application**
5. Copy the **Client ID** and **Client Secret** into your `.env.local` file

---

## File Structure Summary

```
app/
├── api/
│   └── auth/
│       └── [...nextauth]/
│           └── route.js        ← handles all auth requests
├── SessionWrapper.js            ← wraps app with SessionProvider
├── layout.js                    ← import SessionWrapper here
└── page.js                      ← use useSession, signIn, signOut
.env.local                       ← store GITHUB_ID and GITHUB_SECRET
```