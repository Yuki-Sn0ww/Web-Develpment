# React Router DOM

A library that enables navigation in React apps **without reloading the page**.

---

## Why React Router?

React builds **Single Page Applications (SPAs)** — everything runs inside one
`index.html` file. Using traditional `<a>` tags causes a full browser reload on
every navigation, which destroys your app's state and defeats the purpose of React.

React Router solves this by **mounting and unmounting components** instead of
loading new pages.

---

## Core Concepts

### 1. `createBrowserRouter`
Defines your app's routes as an array of objects. Each object has two properties:
- **`path`** — the URL (e.g. `/`, `/about`, `/login`)
- **`element`** — the component to render at that path
```jsx
const router = createBrowserRouter([
  { path: "/",      element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/login", element: <Login /> },
])
```

---

### 2. `RouterProvider`
Connects your router config to the app. Pass your router as a prop.
```jsx
<RouterProvider router={router} />
```

---

### 3. `<Link>` — Navigate Without Reload
Replaces the HTML `<a>` tag. Use `to` instead of `href`.
```jsx
// ❌ Causes full page reload
<a href="/about">About</a>

// ✅ No reload — swaps components
<Link to="/about">About</Link>
```

> Under the hood `<Link>` still renders as an `<a>` tag — it just intercepts
> the click to prevent the reload.

---

### 4. Dynamic Routes & `useParams`
Use `:param` in the path to create dynamic routes, then extract the value
with `useParams`.
```jsx
// Route definition
{ path: "/user/:username", element: <User /> }

// Inside the User component
const { username } = useParams()
// /user/harry  →  username = "harry"
// /user/rohan  →  username = "rohan"
```

---

### 5. `<NavLink>` — Highlight the Active Route
Used mainly in navbars. Works like `<Link>` but exposes an `isActive` boolean
so you can style the currently active route.
```jsx
<NavLink
  to="/about"
  className={({ isActive }) => isActive ? "active" : ""}
>
  About
</NavLink>
```
```css
.active {
  background-color: red;
  color: white;
}
```

---

## Quick Reference

| Tool                 | Purpose                                      |
|----------------------|----------------------------------------------|
| `createBrowserRouter`| Define your route map                        |
| `RouterProvider`     | Connect the router to your app               |
| `<Link>`             | Navigate without page reload                 |
| `<NavLink>`          | Like Link, but highlights when active        |
| `useParams`          | Read dynamic URL segments (`:id`,`:username`)|