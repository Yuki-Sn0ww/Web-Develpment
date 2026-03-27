# Next.js App Router — Layouts

## 1. Grouping Routes with Nested Folders

If you have many endpoints under a section like `admin`, you organize them inside a named folder.

```
app/
└── admin/
    ├── login/
    │   └── page.js     → /admin/login
    ├── dashboard/
    │   └── page.js     → /admin/dashboard
    └── comments/
        └── page.js     → /admin/comments
```

All pages inside `admin/` share the `/admin` prefix in the URL.

---

## 2. Route Groups — Removing the Folder Name from the URL

If you want to group pages together in code **without** adding the folder name to the URL, wrap the folder name in parentheses: `(admin)`.

```
app/
└── (admin)/
    ├── login/
    │   └── page.js     → /login        ✅ no /admin in URL
    └── dashboard/
        └── page.js     → /dashboard    ✅ no /admin in URL
```

Next.js completely ignores the `(admin)` folder when generating URLs. It exists only for your own code organization.

---

## 3. Adding a Specific `layout.js` for a Group

You can place a `layout.js` inside a route group (or any folder) to apply a shared layout only to the pages inside that group.

```
app/
└── (admin)/
    ├── layout.js        ← Only wraps pages inside (admin)
    ├── login/
    │   └── page.js
    └── dashboard/
        └── page.js
```

```jsx
// app/(admin)/layout.js
export default function AdminLayout({ children }) {
  return (
    <div>
      <AdminSidebar />
      <main>{children}</main>
    </div>
  );
}
```

This layout will NOT appear on pages outside the `(admin)` group.

---

## 4. Adding Title and Description to a Page

### Static Metadata (for fixed pages)

```js
// app/about/page.js
export const metadata = {
  title: 'About Us',
  description: 'Learn more about our company.',
};
```

### Dynamic Metadata (for pages where data changes)

Use `generateMetadata` when the title/description depends on fetched data — for example, a specific admin page or a blog post.

```js
// app/(admin)/login/page.js
export async function generateMetadata({ params }) {
  return {
    title: 'Admin Login — MyApp',
    description: 'Sign in to access the admin dashboard.',
  };
}
```

You can also fetch from a database inside `generateMetadata`:

```js
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  return {
    title: post.title,
    description: post.excerpt,
  };
}
```

---

## Quick Summary

| Concept | What it does |
|---|---|
| `app/admin/` folder | Groups routes under `/admin` URL prefix |
| `(admin)` Route Group | Groups files in code — folder name is invisible in URL |
| `layout.js` in a group | Shared layout applied only to pages inside that group |
| `export const metadata` | Sets a static title/description for a page |
| `generateMetadata()` | Sets a dynamic title/description based on fetched data |