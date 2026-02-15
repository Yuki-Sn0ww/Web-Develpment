# EJS Template Engine - Short Notes 📝

## What is EJS?
**Embedded JavaScript** - A templating engine for generating HTML with JavaScript.

---

## Quick Setup

```bash
npm init -y
npm install express ejs
```

```javascript
// index.js
const express = require('express');
const app = express();

app.set('view engine', 'ejs');  // Enable EJS

app.get('/', (req, res) => {
    res.render('index', { name: 'John' });
});

app.listen(3000);
```

**File Structure:**
```
project/
├── views/          ← EJS files go here
│   ├── index.ejs
│   └── partials/
├── index.js
└── package.json
```

---

## 3 EJS Tags

| Tag | Purpose | Example |
|-----|---------|---------|
| `<%= %>` | **Output** (escaped) | `<h1>Hi <%= name %></h1>` |
| `<% %>` | **JavaScript** (no output) | `<% if(x > 5) { %>` |
| `<%- %>` | **Raw HTML** (partials) | `<%- include('navbar') %>` |

---

## Core Concepts

### 1️⃣ Passing Data
```javascript
// Server
res.render('page', { 
    title: 'Home',
    items: [1, 2, 3]
});
```

```ejs
<!-- Template -->
<h1><%= title %></h1>
```

### 2️⃣ Loops
```ejs
<ul>
    <% items.forEach(item => { %>
        <li><%= item %></li>
    <% }) %>
</ul>
```

### 3️⃣ Conditionals
```ejs
<% if(isLoggedIn) { %>
    <p>Welcome!</p>
<% } else { %>
    <p>Please login</p>
<% } %>
```

### 4️⃣ Partials (Reusable Components)
```ejs
<!-- views/partials/navbar.ejs -->
<nav>Logo: <%= siteName %></nav>
```

```ejs
<!-- views/index.ejs -->
<%- include('partials/navbar') %>
<h1>Home Page</h1>
```

### 5️⃣ Dynamic Routes
```javascript
app.get('/blog/:slug', (req, res) => {
    res.render('blogpost', {
        title: 'My Post',
        content: 'Content here'
    });
});
```

---

## Common Patterns

### Array of Objects
```javascript
let products = [
    { name: 'Laptop', price: 999 },
    { name: 'Phone', price: 699 }
];
res.render('shop', { products });
```

```ejs
<% products.forEach(p => { %>
    <div>
        <h3><%= p.name %></h3>
        <p>$<%= p.price %></p>
    </div>
<% }) %>
```

### Empty Array Check
```ejs
<% if(items.length > 0) { %>
    <!-- Show items -->
<% } else { %>
    <p>No items found</p>
<% } %>
```

### Default Values
```ejs
<h1><%= userName || 'Guest' %></h1>
```

---

## Key Points ⭐

1. **Files** → Must be `.ejs` in `views/` folder
2. **Render** → Use `res.render()` not `res.sendFile()`
3. **Variables** → Passed as object in `res.render()`
4. **Partials** → Use `<%- include() %>` (with dash!)
5. **Security** → Use `<%= %>` for user input (NOT `<%- %>`)

---

## Common Errors & Fixes

| Error | Fix |
|-------|-----|
| "Cannot find module 'ejs'" | `npm install ejs` |
| "Failed to lookup view" | File must be in `views/` folder |
| "variable is not defined" | Pass it in `res.render()` |
| HTML shows `<%= code %>` | Change `.html` to `.ejs` |

---

## Complete Mini Example

**index.js:**
```javascript
const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', {
        siteName: 'MyStore',
        products: ['Laptop', 'Phone', 'Tablet']
    });
});

app.listen(3000);
```

**views/index.ejs:**
```ejs
<!DOCTYPE html>
<html>
<head>
    <title><%= siteName %></title>
</head>
<body>
    <h1>Welcome to <%= siteName %></h1>
    
    <ul>
        <% products.forEach(product => { %>
            <li><%= product %></li>
        <% }) %>
    </ul>
</body>
</html>
```

---

## Cheat Sheet

```ejs
<!-- Output -->
<%= variable %>

<!-- Loop -->
<% array.forEach(item => { %>
    <%= item %>
<% }) %>

<!-- Conditional -->
<% if(condition) { %>
    ...
<% } else { %>
    ...
<% } %>

<!-- Include Partial -->
<%- include('partials/header') %>

<!-- Access Object -->
<%= user.name %>

<!-- Access Array -->
<%= colors[0] %>

<!-- Default Value -->
<%= value || 'default' %>
```

---

## Why Use EJS?

✅ **One template** → Thousands of pages  
✅ **Dynamic data** from databases/APIs  
✅ **Reusable components** (navbar, footer)  
✅ **Easy maintenance** - update once, applies everywhere  
✅ **Simple syntax** - just HTML + JavaScript  

---

**Remember:** 
- `<%= %>` = Print value
- `<% %>` = Run code
- `<%- %>` = Include partial

**Happy Coding! 🚀**
