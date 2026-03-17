# Next.js Built-in Components

Next.js replaces basic HTML tags with smarter versions that optimize performance out of the box.

---

## 1. `<Link>` Component

**Replaces:** `<a>` (anchor tag)

**Import:**
```jsx
import Link from 'next/link'
```

**Usage:**
```jsx
<Link href="/about">Go to About</Link>
```

**Why use it:**
- Normal `<a>` tags cause a **full page reload** every time you navigate
- `<Link>` uses **client-side navigation** — only the changed content updates, no reload
- **Pre-fetching:** When a `<Link>` enters the viewport, Next.js silently downloads that page's code in the background so navigation feels instant

---

## 2. `<Script>` Component

**Replaces:** `<script>` tag

**Import:**
```jsx
import Script from 'next/script'
```

**Usage:**
```jsx
<Script src="https://example.com/analytics.js" strategy="lazyOnload" />
```

**Why use it:**
- Normal `<script>` tags can block the page from rendering while the script downloads
- `<Script>` gives you control over **when** the script loads using the `strategy` prop

**Loading Strategies:**

| Strategy | When it loads | Best for |
|---|---|---|
| `beforeInteractive` | Before the page is interactive | Critical scripts |
| `afterInteractive` | After the page hydrates (default) | Most third-party scripts |
| `lazyOnload` | During browser idle time | Analytics, ads, non-urgent scripts |

**Event props:** `onLoad`, `onReady`, `onError` — run code based on the script's status.

---

## 3. `<Image>` Component

**Replaces:** `<img>` tag

**Import:**
```jsx
import Image from 'next/image'
```

**Usage:**
```jsx
<Image src="/photo.jpg" width={800} height={600} alt="A photo" />
```

**Why use it:**
- Normal `<img>` serves the original file as-is — a 4MB image on mobile is wasteful
- `<Image>` automatically:
  - **Resizes** the image based on the user's screen size (mobile gets smaller, desktop gets larger)
  - **Converts** to modern formats like WebP (much smaller file size than PNG/JPG)
  - **Lazy loads** — only fetches the image when it's about to enter the viewport

**For external images** (e.g. from Cloudinary, Unsplash), you must whitelist the domain in `next.config.js`:

```js
// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      { hostname: 'images.unsplash.com' }
    ]
  }
}
```

**Useful props:**
- `fill` — makes the image fill its parent container
- `objectFit` — controls how the image fits (like CSS `object-fit`)

---

## 4. Page Metadata (Title & Description)

Export a `metadata` object from any `page.js` or `layout.js` to set the SEO title and description for that route.

```js
// app/about/page.js
export const metadata = {
  title: "About Us",
  description: "Learn more about our team and mission",
};
```

- Use in **every page** for good SEO
- Defined in `layout.js` → applies to all pages in that folder
- Defined in `page.js` → applies to only that specific route

---

## Summary

| HTML Tag | Next.js Component | What it fixes |
|---|---|---|
| `<a>` | `<Link>` | Full page reloads on navigation |
| `<script>` | `<Script>` | Render-blocking JS loading |
| `<img>` | `<Image>` | Unoptimized, oversized images |